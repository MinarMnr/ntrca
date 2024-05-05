import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://192.168.1.17:8002/auth",
  realm: "Banbeis",
  clientId: "IEIMS",
  credentials: {
    secret: "065386f3-38da-4099-99cd-ec66c17d2e89",
  },
});

export default keycloak;
