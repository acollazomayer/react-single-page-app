import { buildPush, getStoredArray } from '../../lib/stack';

describe('Stack', () => {
  const maxStore = 5;
  const keyName = 'somename';
  const push = buildPush(maxStore, keyName);

  beforeEach(() => {
    localStorage.clear();
  });

  describe('get', () => {

    describe('when there are no elements in the localStorage', () => {

      it('should return an empty array', () => {
        expect(getStoredArray(keyName)).toEqual([]);
      });
    });

    describe('when there is one element in the localStorage', () => {
      const element = JSON.stringify({
        0: 'someelement',
      });

      it('should return only one element', () => {
        localStorage.setItem(keyName, element);
        expect(getStoredArray(keyName)).toEqual(['someelement']);
      });
    });
  });

  describe('push', () => {

    describe('when an element is pushed with an empty array', () => {

      it('should save only one element', () => {
        expect(push([], 'someelement')).toEqual(['someelement']);
      });
    });

    describe('when a repeted element is pushed', () => {

      it('should not save the new element', () => {
        expect(push(['someelement'], 'someelement')).toEqual(['someelement']);
      });
    });

    describe('when the array is full and a new element is pushed', () => {
      const newElements = ['1', '2', '3', '4', 'someelement'];

      it('should remove the first element and push the new one', () => {
        expect(push(['0', '1', '2', '3', '4'], 'someelement')).toEqual(newElements);
      });
    });

    describe('when there is a push of an element', () => {
      const element = JSON.stringify({
        0: 'someelement',
      });

      it('should save the element in the local storage', () => {
        push([], 'someelement');
        expect(localStorage.getItem(keyName)).toEqual(element);
      });
    });
  });
});
