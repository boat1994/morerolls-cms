import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260110_143359 from './20260110_143359';
import * as migration_20260110_144618_projects_init from './20260110_144618_projects_init';
import * as migration_20260110_144852 from './20260110_144852';
import * as migration_20260114_074253_add_contact_and_general from './20260114_074253_add_contact_and_general';
import * as migration_20260115_065130 from './20260115_065130';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260110_143359.up,
    down: migration_20260110_143359.down,
    name: '20260110_143359',
  },
  {
    up: migration_20260110_144618_projects_init.up,
    down: migration_20260110_144618_projects_init.down,
    name: '20260110_144618_projects_init',
  },
  {
    up: migration_20260110_144852.up,
    down: migration_20260110_144852.down,
    name: '20260110_144852',
  },
  {
    up: migration_20260114_074253_add_contact_and_general.up,
    down: migration_20260114_074253_add_contact_and_general.down,
    name: '20260114_074253_add_contact_and_general',
  },
  {
    up: migration_20260115_065130.up,
    down: migration_20260115_065130.down,
    name: '20260115_065130'
  },
];
