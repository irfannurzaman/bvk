export default function selectionFilter({ genres, data } = []) {
  const result = genres.map(genre => ({
    title: genre.name,
    data: data.filter(item => item.genre_ids.includes(genre.id))
  }))

  return result.filter(checkData => checkData.data.length > 0)
}
