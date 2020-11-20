<h1 align="center">SQL Query Optimizer</h1>

An SQL query optimizer that executes an SQL query plan and visualizes its performance, made for a project for NTU's CZ4031 (Database System Principles) course.

![Tables present in the database](https://i.imgur.com/MrvHfD9.png)

Queries are tested against [TPC-H](http://www.tpc.org/tpch/), a benchmark for generating dummy data in a database that attempts to mimic real world operations. The tables present in the database are shown in the image above.

## Installation and setup

1. Ensure that you have [Postgresql](https://www.postgresql.org/download/) installed. This project may work on other databases, but has only been tested on Postgresql.
2. Run [pgAdmin](https://www.pgadmin.org/), which should come bundled in the Postgresql installation. If it's your first time accessing it, it will prompt you to create a root user and password - name this user `postgres` and supply your own password. Create a new database named "TPC-H".
3. Clone this repository into a new folder.
4. Open your terminal and run `psql -U postgres -f dss.ddl TPC-H` from the cloned repository's folder. This command connects you to Postgresql as the default user `postgres`, and runs the SQL commands found in dss.ddl on the database `TPC-H`. The commands will initialize empty tables in the database similar to the ones shown in the image at the top.
5. You may generate your own dummy data using [TPC-H](http://www.tpc.org/tpch/), or use our pre-generated data, found in this [Google drive](https://drive.google.com/drive/folders/1i7FYWI1ePuFFZpMdRO7gwVD2lLw_j03B?usp=sharing). Download `data.zip` and extract it. Each csv file corresponds and contains data of a table in the database.
6. Navigate back to the pgAdmin interface. Right click each table and click on `Import/Export`. Import the corresponding csv file into each table, with the format set to `csv` and encoding set to `UTF-8`. Set the delimeter to `|` and click OK to import the data.
7. Once all data has been imported, right click each table and verify that the data has been correctly imported by clicking `View/Edit Data` > `First 100 Rows`.
8. If all the data seems correct, run `psql -U postgres -f dss.ri TPC-H` in your terminal. This command will create the constraints on the tables, including initializing the primary keys and foreign keys on the various tables.
9. Next, right click each table within pgAdmin and click on `Maintenance`. Tick `Vaccuum`, and turn `Analyze` and `Verbose Messages` on. Run this for each table.
10. Download [Picasso](https://dsl.cds.iisc.ac.in/projects/PICASSO/picasso_download/license.htm). Make sure to select the full library (we recommend getting the zip file). Extract it.
11. Ensure you have at least JDK 6.0 installed. We suggest the latest version of [AdoptOpenJDK](https://adoptopenjdk.net/releases.html). If you have your Java environment set up, navigate to `./PicassoRun/Windows/` and run `activatedb.bat`, `compileServer.bat` and `compileClient.bat` in this order to compile the Java files.
12. To connect to the Postgresql database, we will need to update our JDBC driver to the latest version. The JDBC driver serves to connect the Java application to our Postgresql database. Download it [here](https://jdbc.postgresql.org/download.html#current).
13. Navigate to `./Libraries/` and find the jar file for the old JDBC driver for Postgresql. It should be named something like `postgresql-8.0-311.jdbc3`. Replace this file with the latest version that you just downloaded. Rename it so it matches the old name (e.g. `postgresql-8.0-311.jdbc3`) exactly, so that Picasso can detect it. Alternatively, you can let Picasso detect the name of the new file by modifying the `runServer.bat` script to include the new jdbc driver in `./PicassoRun/Windows/`.
14. Navigate back to `./PicassoRun/Windows/`. We can now start the program. Run `runServer.bat` to start the Picasso server, then run `runClient.bat` to run the Picasso client. A GUI should pop up. Click on `Enter`, and enter the connection details (`localhost` and port `4444` by default).
15. The Picasso client GUI should appear. We need to create a new connection to our TPC-H database. In the top menu, click on `DBConnection`, then click `New`. The DB Connection Settings window should pop up.
16. Fill in the following details:

- Connection details: TPC-H (Arbitrary name to save this connection for use next time)
- Machine: localhost (Where your database is running on)
- Engine: POSTGRES (Which JDBC engine to use to connect to your database)
- Port: 5432 (Default port to connect to the database)
- Database: TPC-H (Name of your database)
- Schema: public (Default schema for the database)
- User: postgres (Your user that owns the database, default root user is postgres)
- Password: \*\*\*\*\*\*\* (Your login password for user postgres)

  Click on `Save`.

17. Now that we've created our connection profile, go to the orange `Settings` pane. Choose your new connection under `DBConnection Descriptor:`. For example, if you've named the connection you just created TPC-H, select that. Picasso then attempts to connect to the database, and prints `STATUS: DONE` at the bottom if it suceeds. If the server terminal window outputs errors about 'Authentication type 10 not supported', go back to step 12 to update your JDBC driver.
18. We also have to update our Java3D driver in order for Picasso to be able to show graphs on a 64-bit architecture (it's legacy software). Download the latest Java3D executable from [this link](https://www.oracle.com/java/technologies/java-archive-downloads-java-client-downloads.html#java3d-1.5.1-oth-JPR). We recommend the `java3d-1_5_1-windows-amd64.exe` for 64-bit Windows.
19. Run the executable and install it. Go to the install location (default `C:/Program Files/Java/Java3D/1.5.1/`) and go to `./lib/ext/`. Copy all the jar files there, and paste it into your libraries folder of Piccasso at `picasso/Libraries/`. Replace any existing files.
20. Next, go back to the install location of Java3D and go to `./bin/`. Copy the `j3dcore-ogl.dll` file, and paste it in `C:/Windows/`, replacing any file there. This basically updates your Java3D runtime to 64-bit architecture.
21. Finally, we can go back to Picasso and load in some query plans in the form of SQL queries to analyze. Ensure that you are connected to your database in the Settings tab (DBConnection Descriptor -> TPC-H).
22. Click on the `QueryTemplate` tab just below the Settings section, and click the `Load QueryTemplate` button on the right. It brings up a default folder. Navigate to the `postgres` folder, and select any query to start.
23. As Picasso loads the query in, you will see the SQL query displayed in the textbox. You can name this query for later retrieval by giving it a name in the `QueryTemplate Descriptor` field.
24. With your SQL query loaded, click on the `Plan Diag` tab to generate a diagram enumerating all the optimized plans. If a prompt appears, click on `Generate Exact Diagram`. Click OK. You should see a colorful 2D square.
