<template>
  <q-page padding>
      <q-form
        @submit="onSubmit"
        class="q-gutter-x-md row"
        :style="styles"
      >
        <q-input
            filled
            v-model="form.nome"
            label="Nome do Livro*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
            filled
            v-model="form.anoPublicacao"
            label="Ano de Publicação*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
            filled
            v-model="form.autor"
            label="Autor do Livro*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        <q-input
            filled
            type="textarea"
            v-model="form.sinopse"
            label="Sinopse*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div class="col-12 q-gutter-sm" :style="styles">
            <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"/>
            <q-btn label="Cancelar" color="white" class="float-right" text-color="primary" :to="{name: 'home'}"/>
          </div>
      </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import livroService from 'src/services/livroService'
import { Book } from 'src/model/book'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const { notify } = useQuasar()
const { post } = livroService()
const form = reactive<Book>({
  nome: '',
  autor: '',
  anoPublicacao: '',
  sinopse: ''
})
const { back } = useRouter()

const onSubmit = async () => {
  try {
    await post(form)
    notify({ message: 'Livro salvo com sucesso', icon: 'check', color: 'positive' })
    back()
  } catch (error) {
    console.error(error)
  }
}

const styles = reactive({
  'justify-content': 'center',
  'align-text': 'center'
})
</script>
