import { SetMetadata } from '@nestjs/common';


export const ONLY_STAFF_KEY = 'only_staff';
export const OnlyStaff = () => SetMetadata(ONLY_STAFF_KEY, true)
