<!-- STEP -->
<!-- init source nextjs and install packages -->

    Install node
    Node home page: https://nodejs.org/en

    install yarn: "npm install --global yarn" (encourage or do you learn how to use npm like yarn)

    NextJs docs home page: https://nextjs.org/docs
    run command: "npx create-next-app@latest"

    What is your project named? <Your project name>
    (In the next steps you can choose the default settings)
    Would you like to use TypeScript? No / Yes
    Would you like to use ESLint? No / Yes
    Would you like to use Tailwind CSS? No / Yes
    Would you like to use `src/` directory? No / Yes
    Would you like to use App Router? (recommended) No / Yes
    Would you like to customize the default import alias (@/_)? No / Yes

    Install project: "yarn"

    Custom server connect database (mongodb) :
    Mongodb home page : https://www.mongodb.com/
        - install packages: "yarn add mongoose dotenv dotenv-webpack"
        - register account.
        - connect by driver
        - create scripts/nextjs
        - change script yarn start
        - run command: "yarn start"
        - config next.config.js to use const of .env file

    Define user model
    Register page (using Material UI +  formik + yup):
        - install packages: "yarn add yarn add @mui/material @emotion/react @emotion/styled formik yup bcrypt-ts"
        - create register page
        - create utils Fetch api
        - create api route for register, actions
    Login page using next-auth
        - login UI
        - install package: "yarn add next-auth@beta"
            + home page : https://authjs.dev/reference/nextjs
        - config next-auth:
            + create api/auth/[...nextauth]/route.tsx
            + create file /auth
            + setting providers (CredentialsProvider: login with usename and password from database)
            + config callbacks:
                session
                jwt
            + get session and show

<!-- init source nextjs and install packages -->
<!-- STEP -->
