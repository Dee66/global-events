export interface EventValidator {
  validate(event: any): Promise<boolean>;
}