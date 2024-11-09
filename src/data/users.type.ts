type userType = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};

type columnsType = {
  name: string;
  uid: string;
}

// Define statusColorMap type based on keys and colors used in the map
export const statusColorMap: Record<'active' | 'paused' | 'vacation', 'success' | 'danger' | 'warning'> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
};

export type usersType = userType[];

export type { userType, columnsType };
