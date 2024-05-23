import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name:'MatchPassword'
})
export class MatchPassword implements ValidatorConstraintInterface{
    validate(password:string,args:ValidationArguments){
        if(password !== (args.object as any)[args.constraints[0]]){
            return false;
        }
        return true;
    }
    defaultMessage(args?: ValidationArguments): string {
        return 'El Password y la confirmacion no coinciden';
        
    }
}