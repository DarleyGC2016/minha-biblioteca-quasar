<template>
  <q-page padding>
      <q-form
        @submit="onSubmit"
        class="q-gutter-x-md row"
        :style="styles"
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
      <!-- :val="[val => validaName(val,'Nome tem que ser maior que 6 letras',6)]" -->
        <!-- <q-input
            filled
            v-model="form.nome"
            label="Nome do Livro*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            maxlength="maxlengthNome"
            lazy-rules
            :rules="[ val => validaName(val,'Nome tem que ser maior que 6 letras', 6)]"
          /> -->
        <!-- <q-input
            filled
            v-model="form.anoPublicacao"
            label="Ano de Publicação*"
            hint="Ano é formado por 4 números"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :maxlength="4"
            :rules="[ val => year(val)]"
          />-->
        <!-- <q-input
            filled
            v-model="form.autor"
            label="Autor do Livro*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :maxlength="15"
            :rules="[ val => min(val) ]"
          /> -->
        <!-- <q-input
            filled
            type="textarea"
            v-model="form.sinopse"
            label="Sinopse*"
            hint="Name and surname"
            class="col-lg-6 col-xs-12"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          /> -->
          <div v-if="verifyChanged()" class="col-12 q-gutter-sm" :style="styles">
            <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"/>
            <q-btn label="Cancelar" color="white" class="float-right" text-color="primary" :to="{name: 'home'}"/>
          </div>
      </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import livroService from 'src/services/livroService'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import InputCamp from 'src/components/InputCamp.vue'
import { Livro } from 'src/model/book'
const nome = ref<string>('Nome do Livro*')
const anoPublicacao = ref<string>('Ano da Publicação*')

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
const nomeOriginal = ref<string>()
onMounted(() => {
  if (params.id) {
    getBook(params.id)
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
    form.id = id
    form.nome = resposta.nome
    nomeOriginal.value = resposta.nome
    form.anoPublicacao = resposta.anoPublicacao
    form.autor = resposta.autor
    form.sinopse = resposta.sinopse
  } catch (error) {
    console.log(error)
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
  console.log('verifica mudanças: ', change.value)

  return (change.value === true)
}
const styles = reactive({
  'justify-content': 'center',
  'align-text': 'center'
})
</script>
