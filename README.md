# Go-Track
Go-Track is to simplify the application process for students, making it easier for them to apply to multiple colleges and universities using a single platform. This will save students time and effort while also increasing the number of applications received by each institution.

## Installation
0. Download and install these tools
    - [Git](https://git-scm.com/download/win)
    - [Node.js](https://nodejs.org/dist/v18.16.1/node-v18.16.1-x64.msi)
    - [MySQL Workbench](https://cdn.mysql.com//Downloads/MySQLGUITools/mysql-workbench-community-8.0.33-winx64.msi)
    - [MySQL Workbench Community Server](https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.33-winx64.zip)
    - [VS Code](https://az764295.vo.msecnd.net/stable/660393deaaa6d1996740ff4880f1bad43768c814/VSCodeUserSetup-x64-1.80.0.exe)
    - [Postman](https://dl-agent.pstmn.io/download/latest/win64)

1. Clone the repo
   ```sh
   git clone https://github.com/shahbazhassan42000/go-track.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Configure .env file according to .env.example file

4. Run the following command in MySQL workbench
    ```SQL
    CREATE DATABASE go_track;
    ```

## Usage    
1. Run the app
    ```sh
    npm run server
    ```
2. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

3. You can export postman collection from the file: 
    ```sh
        Go-Track.postman_collection.json
    ```

