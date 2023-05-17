import { Router } from "express";

export interface IModule {
    readonly router: Router
    readonly modulePath: string
}