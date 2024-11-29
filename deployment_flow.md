flowchart TD
    Start([Start]) --> PreDeploy[Pre-Deployment Checklist]
    PreDeploy --> CodeFreeze[Code Freeze]
    
    CodeFreeze --> CodeFreezeDecision{Code Freeze Complete?}
    CodeFreezeDecision -->|No| WaitFreeze[Wait for Code Freeze]
    WaitFreeze --> CodeFreeze
    
    CodeFreezeDecision -->|Yes| Testing[Unit & Integration Testing]
    Testing --> TestDecision{Tests Passed?}
    TestDecision -->|No| FixTests[Fix Issues and Re-run Tests]
    FixTests --> Testing
    
    TestDecision -->|Yes| Security[Security & Compliance Review]
    Security --> ComplianceDecision{Compliance Approved?}
    ComplianceDecision -->|No| FixCompliance[Fix Compliance Issues and Re-review]
    FixCompliance --> Security
    
    ComplianceDecision -->|Yes| ConfigSync[Configuration Sync]
    ConfigSync --> ApprovalGate[Approval Gate]
    
    ApprovalGate --> ReleaseNotes[Release Notes]
    ReleaseNotes --> Version[Assign Version Number]
    Version --> Document[Document Features, Bug Fixes, Dependencies]
    
    Document --> DeployPrep[Deployment Preparation]
    DeployPrep --> InfraReview[Infrastructure Review]
    InfraReview --> DBBackup[Database Backup]
    DBBackup --> EnvConfig[Environment Configuration]
    EnvConfig --> APISetup[API Gateway & CDN Setup]
    
    APISetup --> DeploySteps[Deployment Execution Steps]
    DeploySteps --> NotifyStake[Notify Stakeholders]
    NotifyStake --> Maintenance[Send Maintenance Notification]
    Maintenance --> DeployStaging[Deploy to Staging]
    DeployStaging --> SmokeTests[Run Smoke Tests]
    
    SmokeTests --> SmokeDecision{Smoke Tests Passed?}
    SmokeDecision -->|No| FixSmoke[Fix Issues and Re-run Smoke Tests]
    FixSmoke --> SmokeTests
    
    SmokeDecision -->|Yes| DeployProd[Deploy to Production]
    DeployProd --> K8sDeploy[Kubernetes Deployment]
    K8sDeploy --> TerraformApply[Apply Terraform Changes]
    TerraformApply --> RollingUpdate[Rolling Update Strategy]
    
    RollingUpdate --> PostValidation[Post-Deployment Validation]
    PostValidation --> HealthChecks[Automated Health Checks]
    HealthChecks --> E2E[End-to-End Testing]
    E2E --> Monitoring[Monitoring & Alerting]
    
    Monitoring --> ValidationDecision{Validation Successful?}
    ValidationDecision -->|No| ConsiderRollback[Consider Rollback]
    ConsiderRollback --> RollbackDecision{Rollback Required?}
    
    RollbackDecision -->|Yes| RollbackProc[Rollback Procedure]
    RollbackProc --> RedeployPrev[Re-deploy Previous Version]
    RedeployPrev --> RollbackTF[Rollback Terraform]
    RollbackTF --> RestoreDB[Restore Database Backup]
    RestoreDB --> PostRollback[Post-Rollback Testing]
    PostRollback --> NotifyRollback[Notify Stakeholders of Rollback]
    
    ValidationDecision -->|Yes| SignOff[Obtain Sign-Off and Complete Deployment]
    
    SignOff --> Documentation[Documentation & Handover]
    Documentation --> ReleaseSummary[Document Release Summary]
    ReleaseSummary --> PostReview[Post-Deployment Review]
    PostReview --> UpdateKB[Update Knowledge Base]
    
    UpdateKB --> End([End])
