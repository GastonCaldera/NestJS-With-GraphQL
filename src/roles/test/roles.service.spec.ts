import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RolesService } from '../services/roles.service';
const mockRoleModel = {
  find: jest.fn(),
  findById: jest.fn(),
};

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken('Role'),
          useValue: mockRoleModel,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of Roles', async () => {
      const mockRoles = [
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
      mockRoleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockRoles),
      });

      const result = await service.findAll();

      expect(result).toEqual(mockRoles);
    });
  });

  describe('findById', () => {
    it('should return a Role by ID', async () => {
      const mockRoles = {
        id: '656614ed5cc0b1663d0a333a',
        firstName: 'Pedro',
        lastName: 'Valderrama',
        version: 1,
      };
      mockRoleModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockRoles),
      });

      const result = await service.findById('656614ed5cc0b1663d0a333a');

      expect(result).toEqual(mockRoles);
    });
  });
});
