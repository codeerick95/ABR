<!-- Muestra datos del editor seleccionado -->
<template>
  <div class="row editor-info" v-if="info">
    <div class="col-md-3">
      <div class="editor-info__image-container mt-1">
        <img :src="info.photoEditor" :alt="info.nameEditor" class="w-100">
      </div>
    </div>

    <div class="col-md-9">
      <h2 class="editor-info__title">{{ info.nameEditor }}</h2>

      <div>
        <p>
          <span class="text-dark bg-light p-1">Apellidos:</span>
          <span>{{ `${info.fatherSurnameEditor} ${info.motherSurnameEditor}` }}</span>
        </p>

        <div class="row">
          <div class="col-lg-6">
            <p class="mr-lg-3">
              <span class="text-dark-50 bg-light p-1">Tipo de documento:</span>
              <span>{{ setTypeDocument(info.typeDocumentEditor) }}</span>
            </p>

          </div>
          <div class="col-lg-6">
            <p>
              <span class="text-dark bg-light p-1">Número de documento:</span>
              <span>{{ info.numberDocumentEditor }}</span>
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <p>
              <span class="text-dark bg-light p-1">Email:</span>
              <span>{{ info.email }}</span>
            </p>

          </div>
          <div class="col-lg-6">
            <p>
              <span class="text-dark bg-light p-1">Fecha de nacimiento:</span>
              <span>{{ $moment(info.dateBirthEditor).format('L') }}</span>
            </p>
          </div>
        </div>


        <div class="row">
          <div class="col-lg-6">
            <p class="mr-lg-3">
              <span class="text-dark bg-light p-1">Tipo de usuario:</span>
              <span>Editor</span>
            </p>

          </div>
          <div class="col-lg-6">
            <p>
              <span class="text-dark bg-light p-1">Nombre de usuario:</span>
              <span>{{ info.alias }}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info'],
    methods: {
      setTypeDocument(value) {
        let type

        if(value === 1) {
          type = 'DNI'
        } else if(value === 2) {
          type = 'Pasaporte'
        } else {
          type = 'Carnet de extranjería'
        }

        return type
      }
    }
  }
</script>

<style lang="scss" scoped>
.editor-info {
  margin-top: 5rem;

  &__title {
    font-size: 2.5em;
    font-weight: 700;
    color: $dark;
  }
}
</style>
