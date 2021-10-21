import AbstractCollectionBuilder from 'q3-admin/lib/builders';
import CharactersMovies from '../CharactersMovies';

export default new AbstractCollectionBuilder({
  collectionName: 'characters',
  resourceName: 'characters',
  resourceNameSingular: 'character',
})
  .genHeader({
    titleProp: 'name',
  })
  .genViews({
    General: () => null,
    movies: CharactersMovies,
  })
  .genResolver(({ id, name, updatedAt }) => ({
    id,
    name,
    updatedAt: {
      base: updatedAt,
      toDate: true,
    },
  }))
  .genList({
    defaultColumns: ['updatedAt'],
  })
  .genDetail({
    notes: true,
    picture: true,
    files: true,
  })
  .genListSettings({
    defaultSortPreference: 'name',
  })
  .build();
