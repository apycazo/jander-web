A demo on how to run commands from java code (in this case it just lists the contents of the home directory, on linux).

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

public class JavaCommand
{
    private static final Logger log = LoggerFactory.getLogger(JavaCommand.class);

    public static void runCommand () throws IOException, InterruptedException
    {
        ProcessBuilder builder = new ProcessBuilder();
        builder.command("ls", "-lh", "/home");
        builder.directory(new File(System.getProperty("user.home")));
        Process process = builder.start();
        StreamGobbler streamGobbler = new StreamGobbler(process.getInputStream(), log::info);
        Executors.newSingleThreadExecutor().submit(streamGobbler);
        int exitCode = process.waitFor();
        assert exitCode == 0;
    }

    private static class StreamGobbler implements Runnable
    {
        private InputStream inputStream;
        private Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer)
        {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run()
        {
            new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(consumer);
        }
    }
}
```