If we want to have our service neatly packaged with all required dependencies, we can use yet another maven plugin:

```xml
<properties>
    <java.version>1.8</java.version>
    <main.class>es.jander.javalin_service.App</main.class>
    <finalname>${project.artifactId}-${project.version}-all</finalname>

    <plugin.maven.compiler.version>3.7.0</plugin.maven.compiler.version>
    <plugin.maven.assembly.version>3.1.0</plugin.maven.assembly.version>

    <javalin.version>1.2.0</javalin.version>
    <slf4j-simple.version>1.7.25</slf4j-simple.version>
    <jackson-databind.version>2.9.3</jackson-databind.version>
    
</properties>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>${plugin.maven.assembly.version}</version>
    <configuration>
        <archive>
            <manifest>
                <mainClass>${main.class}</mainClass>
            </manifest>
        </archive>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <appendAssemblyId>false</appendAssemblyId>
        <finalName>${finalname}</finalName>
    </configuration>
    <executions>
        <execution>
            <id>assemble-all</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```