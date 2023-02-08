import { fromIni } from '@aws-sdk/credential-providers';

export function getCredentials(profile: string) {
  return fromIni({ profile });
}
