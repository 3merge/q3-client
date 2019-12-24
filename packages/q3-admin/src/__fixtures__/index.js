import characters from './characters.json';
import episodes from './episodes.json';
import permissions from './permissions.json';
import thread from './notes.json';

export default (asLoggedIn) => (m) => {
  if (asLoggedIn) {
    m.onGet('/profile').reply(200, {
      permissions,
      profile: {
        id: 1,
        firstName: 'Mike',
      },
    });
  }

  m.onGet(/search/).reply(200, {
    fields: {
      locations: ['Earth', 'Gazorpazorp'],
    },
  });

  m.onGet(/\/characters\/\d+\/thread/).reply(200, {
    thread,
  });

  m.onGet(/\/characters\/\d+\/episodes/).reply(200, {
    episodes,
  });

  m.onGet(/\/characters\/\d+/).reply((config) => {
    const split = config.url.split('/');
    const id = split[split.length - 1];

    return [
      200,
      {
        character: characters.find(
          (c) => String(c.id) === String(id),
        ),
      },
    ];
  });

  m.onDelete(/\/characters\/\d+/).reply(204);

  m.onGet(/^\/characters/).reply(200, {
    characters,
  });

  m.onGet(/\/writers/).reply(200, {
    writers: [],
  });
};
