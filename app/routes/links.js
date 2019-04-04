import Route from "@ember/routing/route";
import { RouteQueryManager } from "ember-apollo-client";
import query from 'ember-apollo/gql/queries/allLinks';

export default Route.extend(RouteQueryManager, {
  model() {
    return this.get('apollo').query({ query }, 'allLinks').catch(error => alert(error));
  }
});