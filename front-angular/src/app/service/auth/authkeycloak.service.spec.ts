import { TestBed } from '@angular/core/testing';

import { AuthkeycloakService } from './authkeycloak.service';

describe('AuthkeycloakService', () => {
  let service: AuthkeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthkeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
