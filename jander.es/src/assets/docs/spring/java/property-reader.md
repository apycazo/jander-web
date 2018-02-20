A property reader from a file source

```java
package com.gitlab.launchbase.misc.javalin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Settings extends Properties
{
    private static final Logger log = LoggerFactory.getLogger(Settings.class);

    public static Settings readFromFile (String filename)
    {
        String path = "";
        Settings settings = new Settings();
        try {
            path = Thread.currentThread().getContextClassLoader().getResource("").getPath() + filename;
            settings.load(new FileInputStream(path));
        } catch (IOException e) {
            log.warn("Unable to find properties file on path: {}", path);

            // try with classloader
            ClassLoader classLoader = App.class.getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream(filename);

            try {
                settings.load(inputStream);
            } catch (IOException e1) {
                log.warn("Unable to find properties file classpath");
            }
        }
        return settings;
    }
}

```