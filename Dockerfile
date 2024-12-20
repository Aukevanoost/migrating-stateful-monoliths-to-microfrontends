# Build stage
FROM maven as build

# Copy source files
COPY src ./src
COPY pom.xml ./pom.xml

# Build the project including test classes
RUN mvn clean package -DskipTests=false

# Create a directory for dependencies
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../TractorStore-1.0-SNAPSHOT.war)

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy application files
COPY --from=build target/test-classes/ /app/test-classes/
COPY --from=build target/classes/ /app/classes/
COPY --from=build target/dependency/ /app/webapp/
COPY --from=build target/TractorStore-1.0-SNAPSHOT.war /app/
COPY --from=build src/main/webapp /app/src/main/webapp

# Copy all dependencies
RUN mkdir -p /app/lib
COPY --from=build target/dependency/WEB-INF/lib/*.jar /app/lib/
COPY --from=build target/TractorStore-1.0-SNAPSHOT/WEB-INF/lib/*.jar /app/lib/

# Expose ports
EXPOSE 8080
EXPOSE 8081
EXPOSE 8443

# Run the Start class with restructured classpath
CMD ["java", "-cp", "/app/test-classes:/app/classes:/app/lib/*", "com.aukevanoost.Start"]