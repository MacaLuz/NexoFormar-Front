import axios from "axios";

export const obtenerCategorias = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/categorias`);
    return res.data;
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

export const eliminarCategoria = async (id: number) => {
  try{
  return axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/categorias/${id}`);
}catch(error){
  return error
}
};

export const crearCategoria = async (nombre: string) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/categorias/`, { nombre });
  } catch (e) {
    console.error("Error al eliminar categoría:", e);
  }
};