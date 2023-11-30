import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { WorkersService } from '../services/workers.service';
import { RolesService } from '../../roles/services/roles.service';
import { LogsService } from '../../logs/services/logs.service';

// Mocking the mongoose model
const mockWorkerModel = {
  find: jest.fn(),
  findById: jest.fn(),
};

const mockRoleModel = {
  find: jest.fn(),
  findById: jest.fn(),
};

const mockLogModel = {
  find: jest.fn(),
};

describe('WorkersService', () => {
  let service: WorkersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        RolesService,
        WorkersService,
        {
          provide: getModelToken('Worker'),
          useValue: mockWorkerModel,
        },
        {
          provide: getModelToken('Role'),
          useValue: mockRoleModel,
        },
        {
          provide: getModelToken('Log'),
          useValue: mockLogModel,
        },
      ],
    }).compile();

    service = module.get<WorkersService>(WorkersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of workers', async () => {
      const mockWorkers = [
        {
          id: '656614865cc0b1663d0a3335',
          firstName: 'Gaston',
          lastName: 'Caldera',
          version: 0,
        },
        {
          id: '656614ed5cc0b1663d0a333a',
          firstName: 'Pedro',
          lastName: 'Valderrama',
          version: 1,
        },
      ];
      mockWorkerModel.find.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            exec: jest.fn().mockResolvedValueOnce(mockWorkers),
          }),
        }),
      }));

      const result = await service.findAll();

      expect(result).toEqual(mockWorkers);
    });
  });

  describe('findById', () => {
    it('should return error when worker ID is invalid', async () => {
      const mockWorker = {
        id: '656614865cc0b1663d0a3335',
        firstName: 'Gaston',
        lastName: 'Caldera',
        version: 0,
      };

      mockWorkerModel.find.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            exec: jest.fn().mockResolvedValueOnce(mockWorker),
          }),
        }),
      }));
      try {
        await service.findById('656614865cc0b1663d0a333b');
      } catch (error) {
        expect(error.response.message).toEqual(
          'Worker with id 656614865cc0b1663d0a333b not found.',
        );
      }
    });
  });
});
