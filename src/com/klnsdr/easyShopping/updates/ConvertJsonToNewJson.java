package com.klnsdr.easyShopping.updates;

import com.klnsdr.easyShopping.storage.service.ListService;
import dobby.util.Json;
import dobby.util.json.NewJson;
import dobby.util.logging.Logger;
import hades.update.Update;
import thot.connector.Connector;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;

public class ConvertJsonToNewJson implements Update {
    private static final Logger LOGGER = new Logger(ConvertJsonToNewJson.class);

    @Override
    public boolean run() {
        final String BUCKET_NAME = ListService.BUCKET_NAME;
        final String[] keys = Connector.getKeys(BUCKET_NAME);
        for (String key : keys) {
            final Object maybeJson = Connector.read(BUCKET_NAME, key, Object.class);
            if (!(maybeJson instanceof Json)) {
                continue;
            }
            final NewJson newJson = convert((Json) maybeJson);
            if (!Connector.write(BUCKET_NAME, key, newJson)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String getName() {
        return "ES_ConvertJsonToNewJson";
    }

    @Override
    public int getOrder() {
        return 20;
    }

    // stole from hades
    private NewJson convert(Json json) {
        final NewJson newJson = new NewJson();

        for (String valueMapName : new String[]{"stringData", "jsonData", "intData", "listData"}) {
            Field field = null;
            try {
                field = Json.class.getDeclaredField(valueMapName);
                field.setAccessible(true);

                switch (valueMapName) {
                    case "stringData":
                        final HashMap<String, String> stringData = (HashMap<String, String>) field.get(json);
                        for (String key : stringData.keySet()) {
                            newJson.setString(key, stringData.get(key));
                        }
                        break;
                    case "jsonData":
                        final HashMap<String, Json> jsonData = (HashMap<String, Json>) field.get(json);
                        for (String key : jsonData.keySet()) {
                            newJson.setJson(key, convert(jsonData.get(key)));
                        }
                        break;
                    case "intData":
                        final HashMap<String, Integer> intData = (HashMap<String, Integer>) field.get(json);
                        for (String key : intData.keySet()) {
                            newJson.setInt(key, intData.get(key));
                        }
                        break;
                    case "listData":
                        final HashMap<String, List<Object>> listData = (HashMap<String, List<Object>>) field.get(json);
                        for (String key : listData.keySet()) {
                            final List<Object> list = listData.get(key);
                            for (int i = 0; i < list.size(); i++) {
                                final Object maybeJson = list.get(i);
                                if (maybeJson instanceof Json) {
                                    list.set(i, convert((Json) maybeJson));
                                }
                            }
                            newJson.setList(key, list);
                        }
                        break;
                    default:
                        LOGGER.warn("Unknown valueMapName: " + valueMapName);
                        break;
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                LOGGER.trace(e);
                return null;
            }
        }

        return newJson;
    }
}
