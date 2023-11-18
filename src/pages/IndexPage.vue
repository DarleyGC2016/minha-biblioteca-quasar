<template>
  <q-page padding>
    <q-table
      title="Livros"
      :rows="livros"
      :columns="columns"
      row-key="name"
      v-if="isLoading()"
    >
    <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn icon="edit" color="primary" dense size="sm"
                @click="handleEditPost(props.row.id)"/>
          <q-btn icon="delete" color="negative" dense size="sm" @click="apagar(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { Livro } from 'components/models'
import { onMounted, ref } from 'vue'
import livroService from 'src/services/livroService'
import { Loading, QSpinnerGears, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const { list, excluir } = livroService()
const columns = [
  { name: 'nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'action', field: 'action', align: 'right' }
]
const router = useRouter()
const livros = ref<Livro[]>([])
const carregando = ref<boolean>()
onMounted(() => {
  setTimeout(() => {
    getLivros()
  }, 1500)
})

const getLivros = async () => {
  try {
    const data = await list()
    if (data.length > 0) {
      carregando.value = true
      livros.value = data
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

const apagar = async (id: number) => {
  try {
    $q.dialog({
      title: 'Atenção',
      message: 'Deseja excluir este livro?',
      cancel: true
    }).onOk(async () => {
      await excluir(id)
      $q.notify({ message: 'excluido com sucesso', icon: 'check', color: 'positive' })
      await getLivros()
    })
  } catch (error) {
    console.log('error: ', error)
  }
}

const handleEditPost = (id: number) => {
  router.push({ name: 'editBook', params: { id } })
}

const isLoading = () => {
  if (carregando.value === true) {
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

</script>
