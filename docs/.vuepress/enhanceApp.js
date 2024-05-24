import { checkAuth } from './login/helper'
import Login from './login/Login'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  let count = 0;
  Vue.mixin({
    mounted() {
      const doCheck = async () => {
        if (!checkAuth()) {
          if(this.$router && this.$router.currentRoute){
            var currentPath = this.$router?.currentRoute.path.split("/")[1];
            if (currentPath.toLowerCase() === "middleware") {
              this.$dlg.modal(Login, {
                width: 300,
                height: 200,
                title: '',
                singletonKey: 'docs-login',
                maxButton: false,
                closeButton: false,
                callback: data => {
                  if (data === true) {
                    // do some stuff after login
                  }
                }
              })
            }

            count = count + 1;
            if (count === 1 && this.$router?.currentRoute.path.split("/")[2] !== "unauthorised.html") {
            const tokenPath = this.$router?.history?._startLocation;
            const url = new URL(`http://_${tokenPath}`);
            const searchParams = new URLSearchParams(url?.search);
            console.log("token = ", searchParams.get('token'));
            let token = searchParams.get('token');
            if (token) {
              localStorage.setItem("bctoken", token);
            } else {
              if (localStorage.getItem("bctoken")) {
                token = localStorage.getItem("bctoken");
              } else {
                token = "";
              }
            }
            try {
              const myHeaders = new Headers();
              myHeaders.append("token", token);
              const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
              };
              let response = await fetch(
                `https://dashboardapi.finbox.in/v1/user/config`,
                requestOptions
              );
              if (response.status === 200) {
              const result = await response.text();
              const json = JSON.parse(result);
              return true;
              } else if (response.status === 401) {
                console.log("unverified");
                window.location.href = "/session-flow/unauthorised";
                return false;
              }
            } catch (e) {
              console.log("not valid ", e);
              window.location.href = "/session-flow/unauthorised";
              return false;
            }
          }
          }
        }
      }

      if (this.$dlg) {
        doCheck()
      } else {
        import('v-dialogs').then(resp => {
          Vue.use(resp.default)
          this.$nextTick(async () => {
            // check if user token is available else redirect to unauthorised page
            doCheck();
          })
        })
      }
    }
  })
}