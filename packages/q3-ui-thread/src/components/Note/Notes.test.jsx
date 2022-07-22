import React from 'react';
import Note from './Note';
import NoteEdit from '../NoteEdit';
import NoteTags from '../NoteTags';

jest.mock('../NoteEdit');

const Stub = () => <div />;

const findElement = (el) =>
  global
    .mount(
      <Note id="test" tags={[]} selectTag={jest.fn()} />,
    )
    .find(el);

const toHaveSome = (el) =>
  expect(findElement(el).length).toBeGreaterThan(0);

const toHaveNone = (el) =>
  expect(findElement(el).length).toBe(0);

describe('Note', () => {
  it('should render tags', () => {
    NoteEdit.mockImplementation(({ children }) =>
      children({
        EditorComponent: Stub,
        IconComponent: Stub,
        isEditing: false,
      }),
    );

    toHaveSome(NoteTags);
  });

  it('should render editor', () => {
    NoteEdit.mockImplementation(({ children }) =>
      children({
        EditorComponent: Stub,
        IconComponent: Stub,
        isEditing: true,
      }),
    );

    toHaveNone(NoteTags);
  });

  it('should render editor edit', () => {
    NoteEdit.mockImplementation(({ children }) =>
      children({
        EditorComponent: Stub,
        IconComponent: Stub,
        canEdit: true,
      }),
    );

    toHaveSome('[aria-label="edit note"]');
  });

  it('should not render editor edit', () => {
    NoteEdit.mockImplementation(({ children }) =>
      children({
        EditorComponent: Stub,
        IconComponent: Stub,
        canEdit: false,
      }),
    );

    toHaveNone('[aria-label="edit note"]');
  });
});
