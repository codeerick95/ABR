import { appConfig } from '../env'

import { services } from '../utilities/api/services'
import { projects } from '../utilities/api/projects'
import { team } from '../utilities/api/team'
import { publications } from '../utilities/api/publications'

export const currentUserStatus = () => {
  if(process.client) {
    return localStorage.getItem(appConfig.nameToken) ? true : false
  }
}

export const state = () => ({
  headerType: 'transparent',
  services: [],
  projects: [],
  posts: [],
  team: [],
  publications: [],
  currentUser: {
    status: currentUserStatus()
    // name: ''
  },
  /* Utilities settings*/
  modalFullScreen: false,
  categorySelected: {},
  modalCategoryDelete: false,
  postSelected: {},
  modalPostDelete: false,
  objectSelected: {},
  modalPublications: false,
  modalEditPublications: false,
  publicationSelected: {},
  formResponseToCommentStatus: false,
  modalComments: false,
  alert: {
    type: '',
    status: false,
    message: ''
  },
  postsSearch: {
    query: '',
    posts: []
  }
})

export const mutations = {
  setHeaderType(state, type) {
      state.headerType = type
  },
  setServices(state) {
      state.services = services
  },
  setProjects(state) {
      state.projects = projects
  },
  setTeam(state) {
      state.team = team
  },
  setPublications(state) {
      state.publications = publications
  },
  setCurrentUser(state, data) {
    state.currentUser.status = true
    state.currentUser.name = data.name
  },
  clearDataCurrentUser(state) {
    state.currentUser.status = false
    // state.currentUser.name = ''
  },
  setModalFullScreen(state, status) {
    state.modalFullScreen = status
  },
  setCategorySelected(state, category) {
    state.categorySelected = category
  },
  setModalCategoryDelete(state, status) {
    state.modalCategoryDelete = status
  },
  /* Posts */
  setPostSelected(state, post) {
    state.postSelected = post
  },
  setModalPostDelete(state, status) {
    state.modalPostDelete = status
  },
  setObjectSelected(state, object) {
    state.objectSelected = object
  },
  setModalPublications(state, status) { // Modal full screen
    state.modalPublications = status
  },
  setModalEditPublications(state, status) { // Modal pequeño para editar datos de publicación
    state.modalEditPublications = status
  },
  setPublicationSelected(state, object) {
    state.publicationSelected = object
  },
  reloadPage() { // (Pequeño hack) Se utiliza para recargar la página en el login y así recuperar el token
    window.location.reload(true)
  },
  setFormResponseToCommentStatus(state, value) { // Muestra u oculta el form para responder un comentario
    state.formResponseToCommentStatus = !state.formResponseToCommentStatus
  },
  setModalComments(state, value) {
    state.modalComments = value
  },
  setAlert(state, alert) {
    state.alert = alert
  },
  setPostsBySearch(state, data) {
    // Utilizado para la búsqueda de posts
    state.postsSearch.query = data.query
    state.postsSearch.posts = data.posts
  }
}

export const actions = {
  saveCurrentUser(state, data) {
    // Guarda datos localStorage
    /*if(process.client) {
      localStorage.setItem('abr_user_name', data.name)
      localStorage.setItem(appConfig.nameToken, data.token)
    }*/

    // Guarda datos en vuex
    state.commit('setCurrentUser', data)
  }
}
