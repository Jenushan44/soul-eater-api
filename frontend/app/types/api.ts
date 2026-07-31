export type Character = {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  description: string;
  image_url: string | null;
  species: string;
  sex: string;
  soul_type: string;
  status: string;
  occupations: string[];
  partners: string[];
  abilities: string[];
  debut: string;
  continuity: string;
};

export type Weapon = {
  id: number;
  name: string;
  weapon_type: string;
  weapon_category: string;
  meister: string[];
  affiliation: string;
  abilities: string[];
  description: string;
  status: string;
  image_url: string | null;
  continuity: string;
};

export type Ability = {
  id: number;
  name: string;
  category: string;
  users: string[][];
  description: string;
  continuity: string;
  image_url?: string;
};

export type Organization = {
  id: number;
  name: string;
  organization_type: string;
  display_type: string;
  leader: string;
  location: string;
  status: string;
  description: string;
  image_url?: string;
};

export type Arc = {
  id: number;
  name: string;
  episodes: string | null;
  manga_chapters: string | null;
  main_characters: string[];
  main_conflict: string;
  description: string;
  status: string;
  image_url?: string;
}