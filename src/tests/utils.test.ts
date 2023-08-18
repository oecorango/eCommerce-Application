import { logIn, logOut } from '../utils/utils';

describe('logOut', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should remove "id", "auth", and "name" from localStorage', () => {
    localStorage.setItem('id', '123');
    localStorage.setItem('auth', 'true');
    localStorage.setItem('name', 'John');

    logOut();

    expect(localStorage.getItem('id')).toBe(null);
    expect(localStorage.getItem('auth')).toBe(null);
    expect(localStorage.getItem('name')).toBe(null);
  });

  it('should not throw errors if items are not present in localStorage', () => {
    expect(() => logOut()).not.toThrow();
  });
});

// describe('logIn', () => {
//   it('should store user data in localStorage', () => {
//     const fakeCustomerSignInResult = {
//       body: {
//         customer: {
//           id: 'user123',
//           firstName: 'John',
//         },
//       },
//     };

//     const localStorageMock = {
//       setItem: jest.fn(),
//     };

//     // Заменяем глобальный localStorage на наш мок
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     logIn(fakeCustomerSignInResult);

//     // Проверяем, что нужные методы localStorage были вызваны с правильными аргументами
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('id', 'user123');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('name', 'John');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('auth', 'true');
//   });

//   it('should store only id and auth in localStorage if userName is not provided', () => {
//     const fakeCustomerSignInResult = {
//       body: {
//         customer: {
//           id: 'user123',
//         },
//       },
//     };

//     const localStorageMock = {
//       setItem: jest.fn(),
//     };

//     Object.defineProperty(window, 'localStorage', { value: localStorageMock });

//     logIn(fakeCustomerSignInResult);

//     // Проверяем, что нужные методы localStorage были вызваны с правильными аргументами
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('id', 'user123');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('auth', 'true');
//     expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
//       'name',
//       expect.anything(),
//     );
//   });
// });
