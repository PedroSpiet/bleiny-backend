import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


let fakeUser: FakeUserRepository;
let createUser: CreateUserService;
let fakeHash: FakeHashProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUser = new FakeUserRepository();
    fakeHash = new FakeHashProvider();
    createUser = new CreateUserService(fakeUser, fakeHash);
  });

  test('should be able to create a new user', async () => {
    const user = await createUser.execute({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.com',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    expect(user).toHaveProperty('id');
  });

  test('should NOT be able to create a two users with same email', async () => {
    await createUser.execute({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.cm',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    await expect(
      createUser.execute({
        UF: 'SP',
        age: 11,
        city: 'Guarujá',
        email: 'Pedro@mail.cm',
        full_name: 'Pedro Emanoel do Nascimento',
        isInfluencer: false,
        password: '12345',
        username: 'Renato Gaucho',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should NOT be able to create a two users with same username', async () => {
    await createUser.execute({
      UF: 'SP',
      age: 11,
      city: 'Guarujá',
      email: 'Pedro@mail.com',
      full_name: 'Pedro Emanoel do Nascimento',
      isInfluencer: false,
      password: '12345',
      username: 'Renato Gaucho',
    });

    await expect(
      createUser.execute({
        UF: 'SP',
        age: 11,
        city: 'Guarujá',
        email: 'Pedro@mail.com',
        full_name: 'Pedro Emanoel do Nascimento',
        isInfluencer: false,
        password: '12345',
        username: 'Renato Gaucho',
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
});
