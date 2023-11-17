import { api } from 'boot/axios'
import { Livro, Book } from 'src/model/book'

export default function useApi (url: string) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error('erro em carregar os dados')
    }
  }

  const findById = async (id: string) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error('erro em carregar os dados')
    }
  }

  const post = async (obj: Book) => {
    try {
      const { data } = await api.post(url, obj)
      return data
    } catch (error) {
      throw new Error('erro em carregar os dados')
    }
  }

  const update = async (obj: Livro) => {
    try {
      const { data } = await api.put(`${url}/${obj.id}`, obj)
      return data
    } catch (error) {
      throw new Error('erro em carregar os dados')
    }
  }

  const excluir = async (id: number) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error('erro em carregar os dados')
    }
  }

  return {
    list,
    post,
    update,
    excluir,
    findById
  }
}
