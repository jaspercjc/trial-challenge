navigate to the project directory and create a .env file or rename .env.example to .env

From the .env file, set the correct values for the database connection
\*\*please note that if you are creating a new .env file, add VITE_APP_BASEURL variable with http://localhost:8000 as value

run the following from the terminal

-   npm install
-   composer install
-   php artisan key:generate
-   php artisan migrate
-   npm run dev
-   php artisan serve (separate terminal)

the migration will seed

-   2 roles (admin and guest)
-   an admin user with
    username: admin,
    email: admin@gmail.com,
    password: password

This can be used to login as administrator

From the browser navigate to http://localhost:8000/

Demo: <a href="http://growmodo-trial-task.herokuapp.com/">Trial Task</a>
