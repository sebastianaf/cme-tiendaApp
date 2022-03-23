import { backendPath, headers } from '../../../config/config'

const getCliente = async () => {
  try {
    var req = {
      headers,
      method: 'POST',
    }
    const res = await (await fetch(`${backendPath}/cliente`, req)).json()
    //console.log(res)
    return res
  } catch (error) {
    return { error: 'Error de conexión' }
  }
}

export { getCliente }
