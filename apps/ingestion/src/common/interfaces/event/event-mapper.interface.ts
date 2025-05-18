export interface EventMapper {
  map(raw: any): Promise<any>;
}