import { appConfig } from '../env'

export default function({context, app}){
  let token = app.$cookies.get(appConfig.nameToken)

  return {
    httpEndpoint: appConfig.graphUrl,
    getAuth:() => `Bearer ${token}`, // use this method to overwrite functions
    inMemoryCacheOptions: {
      addTypename: false
    }
  }
}
