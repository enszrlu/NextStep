export interface NavigationAdapter {
  push: (path: string) => void;
  getCurrentPath: () => string;
}
