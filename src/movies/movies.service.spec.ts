import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array of movies', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Action', 'Comedy'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw NotFoundException', () => {
      expect(() => {
        service.getOne(999);
      }).toThrow(NotFoundException);
    });
  });

  describe('deleteOne()', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Action', 'Comedy'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw NotFoundException', () => {
      expect(() => {
        service.deleteOne(999);
      }).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const movie = service.create({
        title: 'Test Movie',
        genres: ['Action', 'Comedy'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Action', 'Comedy'],
        year: 2000,
      });
      service.update(1, {
        title: 'Updated Movie',
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Updated Movie');
    });
    it('should throw NotFoundException', () => {
      expect(() => {
        service.update(999, {
          title: 'Updated Movie',
          genres: ['Action', 'Comedy'],
          year: 2020,
        });
      }).toThrow(NotFoundException);
    });
  });
});
