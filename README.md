# fwp-stellar

This project folder contains an auth-server folder and an application folder.

### Start the auth-server
You can find the [README.md](https://github.com/DenisaIoanaMatei/fwp-stellar/tree/main/auth-server) in the `auth-server` folder.
`cd` into `auth-server` and run `node server`. (Works only after you installed all dependencies.)

### Start the app
You can find the [README.md](https://github.com/DenisaIoanaMatei/fwp-stellar/tree/main/stellar-wallet) in the `stellar-wallet` folder.
Now, `cd` into `stellar-wallet` and run `npm start`. (Works only after you installed all dependencies.)

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

### Expected behaviour

If the app is running you should see the `Login` & `Signup` page.

![image](https://user-images.githubusercontent.com/32926158/127002353-934c3a1b-d3d4-45dc-beb8-fc3d0aa7bab9.png)


This page is calling `/api/auth/signup` or `/api/auth/login` from the auth-server.

Once you're logged in explore the app. 😉
