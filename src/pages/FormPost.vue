<template>
  <q-page padding>
      <q-form
        @submit="onSubmit"
        class="q-gutter-x-md row form"
      >
      <input-camp
          :label="nome"
          v-model="form.nome"
          :validate="validaTexto(form.nome, 'Nome tem que ser maior que 6 letras', 6)"
        />
        <input-camp
          :label="anoPublicacao"
          v-model="form.anoPublicacao"
          :validate="year(form.anoPublicacao)"
        />
        <input-camp
          :label="autor"
          v-model="form.autor"
          :validate="validaAutor(form.autor, 'Autor tem que ser maior que 4 letras', 4)"
        />
        <text-area-camp
          :label="sinopse"
          v-model="form.sinopse"
          :validate="validaTextArea(form.sinopse,'Sinopse tem que ser maior que 15 letras', 15)"
        />
        <div class="q-gutter-x-md row">
          <q-btn label="Salvar" color="primary" class="btn"  icon="save" type="submit"/>
        </div>
      </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import livroService from 'src/services/livroService'
import { Book } from 'src/model/book'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import InputCamp from 'src/components/InputCamp.vue'
import textAreaCamp from 'src/components/textAreaCamp.vue'

const { notify } = useQuasar()
const { post } = livroService()
const change = ref<boolean>(false)
const nome = ref<string>('Nome do Livro*')
const autor = ref<string>('Autor*')
const anoPublicacao = ref<string>('Ano da Publicação*')
const sinopse = ref<string>('Sinopse*')
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

const validaTexto = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (str.length <= min) {
    change.value = false
    return 'Está abaixo do minimo de letras'
  } else if (str.length === 0) {
    change.value = false
    return message
  }

  return true
}

const validaAutor = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (str.length <= min) {
    change.value = false
    return 'Está abaixo do minimo de letras'
  } else if (str.length === 0) {
    change.value = false
    return message
  }

  return true
}

const validaTextArea = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (str.length <= min) {
    change.value = false
    return 'Está abaixo do minimo de letras'
  } else if (str.length === 0) {
    change.value = false
    return message
  }

  return true
}

const year = (val: string): boolean | string => {
  if (val && val.length < 4) {
    change.value = true
    return /^[0-9]{4}$/.test(val)
  } else if (val.length === 0) {
    change.value = false
    return 'Digite um ano valido'
  }
  return true
}
</script>
<style>
.form {
    display: flex;
    justify-items: center;
    justify-content: center;
    margin-top: 33.5px;
    margin-left: 380px;
    width: 400px;
    max-width: 100%;
  }

  .btn {
    display: flex;
    justify-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 15px;
    width: 400px;
    max-width: 100%;
  }
</style>
