import useApi from 'src/composables/UseApi'

const livroService = () => {
  const { list, post, update, excluir, findById } = useApi('livros')
  return {
    list,
    post,
    update,
    excluir,
    findById
  }
}

export default livroService
