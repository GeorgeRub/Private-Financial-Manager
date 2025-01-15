import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://local.keycloak.com//",
    realm: "private-financial-manager",
    clientId: "pfm",
});

export default keycloak;