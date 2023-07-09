# Go-Track
Go-Track is to simplify the application process for students, making it easier for them to apply to multiple colleges and universities using a single platform. This will save students time and effort while also increasing the number of applications received by each institution.

## Installation
0. Download and install these tools
    - [Git](https://objects.githubusercontent.com/github-production-release-asset-2e65be/23216272/9c178893-460e-4498-ae06-7c42bdbfcb5c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230709%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230709T084549Z&X-Amz-Expires=300&X-Amz-Signature=91c635a47f0edd778d101a2967b78425347bebc9c01a9fc48b1f031585677c9b&X-Amz-SignedHeaders=host&actor_id=30266968&key_id=0&repo_id=23216272&response-content-disposition=attachment%3B%20filename%3DGit-2.41.0.2-64-bit.exe&response-content-type=application%2Foctet-stream)
    - [Node.js](https://nodejs.org/dist/v18.16.1/node-v18.16.1-x64.msi)
    - [MySQL Workbench](https://cdn.mysql.com//Downloads/MySQLGUITools/mysql-workbench-community-8.0.33-winx64.msi)
    - [MySQL Workbench Community Server](https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.33-winx64.zip)
    - [VS Code](https://az764295.vo.msecnd.net/stable/660393deaaa6d1996740ff4880f1bad43768c814/VSCodeUserSetup-x64-1.80.0.exe)

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
