import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ApolloService from "ember-apollo-client/services/apollo";
import { setContext } from "apollo-link-context";

export default ApolloService.extend({
  auth: service(),

  _runAuthorize(req, context) {
    const token = this.get('auth').getAuthToken();
    let headers = {};
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    return headers;
  },


  link: computed(function() {
    let httpLink = this._super(...arguments);

    let authLink = setContext((request, context) => {
      return this._runAuthorize(request, context);
    });
    return authLink.concat(httpLink);
  }),
});