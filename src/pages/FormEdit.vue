<template>
  <q-page padding>

      <q-form
        @submit="onSubmit"
        class="q-gutter-x-md row edit"
        v-if="isLoading()"
      >
      <!-- <q-inner-loading :showing="carregar"/> -->
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

        <div v-if="verifyChanged()" class="q-gutter-x-md row">
          <q-btn label="Salvar" color="primary" class="btn"  icon="save" type="submit"/>
          <q-btn label="Cancelar" color="negative" class="btn"  :to="{name: 'home'}"/>
        </div>
      </q-form>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import livroService from 'src/services/livroService'
import { Loading, QSpinnerGears, useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import InputCamp from 'src/components/InputCamp.vue'
import textAreaCamp from 'src/components/textAreaCamp.vue'
import { Livro } from 'src/model/book'
const nome = ref<string>('Nome do Livro*')
const autor = ref<string>('Nome do Livro*')
const anoPublicacao = ref<string>('Ano da Publicação*')
const sinopse = ref<string>('Sinopse*')

const { notify } = useQuasar()
const { update, findById } = livroService()
const form = reactive<Livro>({
  id: '',
  nome: '',
  autor: '',
  anoPublicacao: '',
  sinopse: ''
})
const { back } = useRouter()
const { params } = useRoute()

const change = ref<boolean>(false)
const carregar = ref<boolean>(false)
const nomeOriginal = ref<string>()
const autorOriginal = ref<string>()
const sinopseOriginal = ref<string>()

onMounted(() => {
  if (params.id) {
    setTimeout(() => {
      getBook(params.id)
    }, 1500)
  }
})

const onSubmit = async () => {
  try {
    await update(form)
    notify({ message: 'Livro salvo com sucesso', icon: 'check', color: 'positive' })
    back()
  } catch (error) {
    console.error(error)
  }
}

const getBook = async (id: string) => {
  try {
    const resposta = await findById(id)

    if (resposta.nome !== '') {
      carregar.value = true
      form.id = id
      form.nome = resposta.nome
      nomeOriginal.value = resposta.nome
      sinopseOriginal.value = resposta.sinopse
      autorOriginal.value = resposta.autor
      form.anoPublicacao = resposta.anoPublicacao
      form.autor = resposta.autor
      form.sinopse = resposta.sinopse
    }
  } catch (error) {
    console.log(error)
  }
}

const isLoading = () => {
  if (carregar.value === true) {
    Loading.hide()
    return true
  } else {
    Loading.show({
      message: 'carregando...',
      spinner: QSpinnerGears
    })
    return false
  }
}

const validaTexto = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (nomeOriginal.value && str && nomeOriginal.value !== str) {
    if (str.length <= min) {
      change.value = false
      return 'Está abaixo do minimo de letras'
    } else {
      change.value = true
      return true
    }
  } else if (str.length === 0) {
    change.value = false
    return message
  }

  return true
}

const validaAutor = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (autorOriginal.value && str && autorOriginal.value !== str) {
    if (str.length <= min) {
      change.value = false
      return 'Está abaixo do minimo de letras'
    } else {
      change.value = true
      return true
    }
  } else if (str.length === 0) {
    change.value = false
    return message
  }

  return true
}

const validaTextArea = (str: string,
  message: string,
  min: number) : boolean | string => {
  if (sinopseOriginal.value && str && sinopseOriginal.value !== str) {
    if (str.length <= min) {
      change.value = false
      return 'Está abaixo do minimo de letras'
    } else {
      change.value = true
      return true
    }
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

const verifyChanged = (): boolean => {
  return (change.value === true)
}

</script>
<style lang="scss">
  .edit {
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
