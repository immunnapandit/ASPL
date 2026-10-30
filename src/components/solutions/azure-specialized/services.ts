export interface AzureServiceFaq {
  question: string;
  answer: string;
}

export interface AzureServiceItem {
  slug: string;
  title: string;
  cardDescription: string;
  introduction: string;
  about: string;
  image: string;
  imageAlt: string;
  challenges: Array<{ title: string; description: string }>;
  offers: Array<{ title: string; description: string }>;
  capabilities: string[];
  technologies: string[];
  benefits: Array<{ title: string; description: string }>;
  approach: Array<{ title: string; description: string }>;
  useCases: Array<{ title: string; description: string }>;
  faqs: AzureServiceFaq[];
  relatedSlugs: string[];
  seo: { title: string; description: string; keywords: string };
}

export const azureSpecializedServices: AzureServiceItem[] = [
  {
    slug: 'sap-on-azure-specialized-migration',
    title: 'SAP-on-Azure Specialized Migration',
    cardDescription: 'Move SAP landscapes to Azure with a workload-aware plan for performance, resilience, and a controlled cutover.',
    introduction: 'Modernize SAP infrastructure on Microsoft Azure with a migration plan shaped around your system landscape, business calendar, and availability needs.',
    about: 'Our SAP-on-Azure migration service assesses the application stack, interfaces, data, and operating model together. We map the target architecture, validate sizing and dependencies, then coordinate migration waves with SAP and infrastructure stakeholders.',
    image: '/assets/img/azure-services/sap-azure-migration.svg',
    imageAlt: 'Illustration of SAP workloads moving through a protected migration path into Azure cloud infrastructure',
    challenges: [
      { title: 'Interdependent landscapes', description: 'ERP, databases, interfaces, batch jobs, and identity services must move in a sequence that protects business processes.' },
      { title: 'Performance uncertainty', description: 'Sizing compute, storage, and network throughput without representative workload data can create risk after cutover.' },
      { title: 'Business downtime limits', description: 'Finance, manufacturing, and supply chain windows leave little room for an untested migration or extended outage.' },
      { title: 'Unclear ownership', description: 'SAP, application, security, and cloud teams need shared runbooks and escalation paths before production changes begin.' }
    ],
    offers: [
      { title: 'Landscape discovery', description: 'Inventory SAP systems, interfaces, dependencies, operating constraints, and current infrastructure.' },
      { title: 'Target architecture', description: 'Define Azure regions, VM families, storage, network connectivity, backup, and availability patterns for each tier.' },
      { title: 'Migration wave plan', description: 'Sequence non-production and production moves with rehearsals, data validation, cutover gates, and rollback criteria.' },
      { title: 'Operational transition', description: 'Document monitoring, patching, backup, recovery, and support responsibilities for the new environment.' }
    ],
    capabilities: ['SAP workload and dependency assessment', 'Azure VM and storage sizing recommendations', 'ExpressRoute and hybrid connectivity design', 'High availability and backup planning', 'Cutover rehearsal and post-migration validation'],
    technologies: ['SAP S/4HANA and SAP NetWeaver', 'Azure Virtual Machines', 'Azure NetApp Files and Managed Disks', 'Azure Migrate', 'Azure Backup and Azure Monitor'],
    benefits: [
      { title: 'Predictable transition', description: 'A rehearsed sequence gives business owners clear cutover decisions and recovery options.' },
      { title: 'Fit-for-purpose capacity', description: 'Workload evidence informs compute, memory, storage, and network choices.' },
      { title: 'Improved resilience', description: 'Recovery and availability are planned as part of the landing design, not deferred until after go-live.' },
      { title: 'Cloud operating clarity', description: 'Teams leave with documented ownership, runbooks, and monitoring expectations.' }
    ],
    approach: [
      { title: 'Discover', description: 'Review SAP versions, sizing, interfaces, current backup posture, and critical business periods.' },
      { title: 'Design', description: 'Agree the Azure topology, connectivity, security controls, and migration strategy for each system.' },
      { title: 'Rehearse', description: 'Test representative workloads, data transfer, application validation, and rollback steps in a safe environment.' },
      { title: 'Migrate and stabilize', description: 'Coordinate cutover, confirm business transactions, and hand over tuned operations with a stabilization plan.' }
    ],
    useCases: [
      { title: 'S/4HANA modernization', description: 'Prepare a move from legacy infrastructure as part of an SAP platform refresh.' },
      { title: 'Data-center exit', description: 'Consolidate aging SAP hosting before a facility closure or infrastructure contract end.' },
      { title: 'Hybrid SAP operations', description: 'Connect Azure-hosted SAP systems with retained sites, factories, or partner networks.' }
    ],
    faqs: [
      { question: 'Can the migration be planned around SAP business calendars?', answer: 'Yes. The wave plan can account for financial close, production peaks, regional time zones, and agreed maintenance windows.' },
      { question: 'Do you assess SAP sizing before recommending Azure VM sizes?', answer: 'Yes. We review available utilization and workload evidence, then document sizing assumptions and validation activities.' },
      { question: 'Can you support a migration rehearsal?', answer: 'The engagement can include a rehearsal plan covering data movement, application checks, cutover roles, and rollback criteria.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'azure-disaster-recovery-testing'],
    seo: {
      title: 'SAP on Azure Migration Services | AtiSunya',
      description: 'Plan SAP on Azure migration with workload discovery, target architecture, migration rehearsals, cutover planning, and operational transition support.',
      keywords: 'SAP on Azure migration, SAP Azure consulting, S/4HANA migration, SAP cloud migration, Azure infrastructure'
    }
  },
  {
    slug: 'vmware-to-azure-migration-factory',
    title: 'VMware-to-Azure Migration Factory',
    cardDescription: 'Establish repeatable discovery, wave planning, migration, and validation for VMware estate moves to Azure.',
    introduction: 'Turn a large VMware estate move into a repeatable migration program with clear workload groups, tested patterns, and accountable wave governance.',
    about: 'The migration factory service establishes the practical machinery for moving virtual machines to Azure at scale. We combine inventory quality, application-owner decisions, landing-zone readiness, migration tooling, and business validation into a consistent operating cadence.',
    image: '/assets/img/azure-services/vmware-migration-factory.svg',
    imageAlt: 'VMware virtual machine groups organized into repeatable migration waves toward Azure',
    challenges: [
      { title: 'Incomplete inventories', description: 'Aging CMDB records and unknown application dependencies make it difficult to form safe migration waves.' },
      { title: 'Uneven workload readiness', description: 'Different owners, operating systems, and service levels require more than a single lift-and-shift checklist.' },
      { title: 'Competing migration priorities', description: 'Teams need transparent criteria to sequence business value, risk, technical complexity, and data-center deadlines.' },
      { title: 'Repeatability at scale', description: 'Manual runbooks slow delivery and make evidence, quality, and cost hard to compare across waves.' }
    ],
    offers: [
      { title: 'Factory setup', description: 'Define roles, governance, stage gates, intake templates, reporting, and migration runbooks.' },
      { title: 'Portfolio segmentation', description: 'Group workloads by dependency, readiness, business impact, and target Azure pattern.' },
      { title: 'Wave execution support', description: 'Coordinate replication, test windows, business sign-off, cutover, and post-move checks.' },
      { title: 'Progress and exit tracking', description: 'Report migration outcomes, blockers, risks, and source-environment retirement evidence.' }
    ],
    capabilities: ['VM estate discovery and data-quality review', 'Application dependency mapping and wave design', 'Azure Migrate readiness and replication planning', 'Cutover, validation, and rollback runbooks', 'Factory dashboards and governance checkpoints'],
    technologies: ['VMware vSphere', 'Azure Migrate', 'Azure Site Recovery', 'Azure Virtual Machines', 'Azure Monitor and Log Analytics'],
    benefits: [
      { title: 'A migration rhythm teams can repeat', description: 'Common gates and runbooks reduce the effort required to start each new wave.' },
      { title: 'Earlier risk visibility', description: 'Dependency and readiness reviews surface complex applications before cutover windows are booked.' },
      { title: 'Clear portfolio progress', description: 'Leaders can see wave status, decisions, exceptions, and data-center exit dependencies.' },
      { title: 'Safer workload transitions', description: 'Business validation and fallback planning are built into the factory workflow.' }
    ],
    approach: [
      { title: 'Mobilize', description: 'Agree scope, migration principles, stakeholders, security requirements, and success measures.' },
      { title: 'Build the factory', description: 'Create standard intake, assessment, wave, testing, cutover, and reporting practices.' },
      { title: 'Pilot', description: 'Move a representative group to test tooling, timings, application validation, and handoffs.' },
      { title: 'Scale and improve', description: 'Run migration waves, resolve blockers, and refine the playbook using lessons from each move.' }
    ],
    useCases: [
      { title: 'Data-center closure', description: 'Move a broad server portfolio before a lease, hardware, or colocation deadline.' },
      { title: 'VMware estate rationalization', description: 'Prioritize workloads for rehost, modernization, retirement, or continued on-premises operation.' },
      { title: 'Regional cloud adoption', description: 'Coordinate application moves across business units with consistent security and approval gates.' }
    ],
    faqs: [
      { question: 'Does every VMware virtual machine need to move to Azure?', answer: 'No. Discovery should classify candidates for migration, modernization, retirement, or an explicitly retained hosting model.' },
      { question: 'How are migration waves formed?', answer: 'Wave design considers dependencies, business criticality, technical readiness, change windows, and available validation owners.' },
      { question: 'Can an existing cloud team run the factory?', answer: 'Yes. Factory roles and templates can be designed for your teams to operate, with advisory support for complex waves.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'dedicated-azure-finops-assessment'],
    seo: {
      title: 'VMware to Azure Migration Factory | AtiSunya',
      description: 'Scale VMware to Azure migrations with portfolio discovery, migration waves, repeatable runbooks, Azure Migrate planning, and cutover governance.',
      keywords: 'VMware to Azure migration, Azure migration factory, Azure Migrate, virtual machine migration, data center migration'
    }
  },
  {
    slug: 'dedicated-azure-finops-assessment',
    title: 'Dedicated Azure FinOps Assessment',
    cardDescription: 'Find cost drivers, ownership gaps, and practical optimization opportunities across Azure subscriptions.',
    introduction: 'Make Azure spending easier to explain and manage with an assessment that connects technical usage, financial data, and accountable owners.',
    about: 'A dedicated Azure FinOps assessment reviews how cloud costs are generated, allocated, forecast, and acted on. The result is a prioritized set of opportunities and operating practices that help engineering, finance, and product teams make informed trade-offs.',
    image: '/assets/img/azure-services/azure-finops.svg',
    imageAlt: 'Azure cost optimization illustration with cloud spend signals flowing into a clear financial dashboard',
    challenges: [
      { title: 'Unclear spend ownership', description: 'Shared subscriptions and inconsistent tags make it hard to connect charges to services or teams.' },
      { title: 'Forecasts that drift', description: 'Usage patterns, new workloads, and changing commitments can outpace spreadsheet-based forecasts.' },
      { title: 'Optimization without context', description: 'Capacity reductions can harm reliability when teams do not understand utilization or business requirements.' },
      { title: 'Recommendations that stall', description: 'Savings ideas lose value when they lack owners, validation steps, or a recurring review process.' }
    ],
    offers: [
      { title: 'Spend baseline', description: 'Review cost data by subscription, service, environment, region, and available business dimensions.' },
      { title: 'Optimization review', description: 'Evaluate right-sizing, idle resources, storage tiers, reservations, savings plans, and architecture choices.' },
      { title: 'Governance and allocation', description: 'Assess tagging, budgets, policy, chargeback or showback practices, and ownership coverage.' },
      { title: 'Action roadmap', description: 'Prioritize recommendations by effort, confidence, savings potential, and service risk.' }
    ],
    capabilities: ['Azure Cost Management data analysis', 'Resource utilization and sizing review', 'Tagging and allocation model assessment', 'Commitment and purchasing strategy review', 'FinOps cadence, ownership, and reporting design'],
    technologies: ['Azure Cost Management', 'Azure Advisor', 'Azure Monitor', 'Microsoft Cost Management exports', 'Power BI cost reporting'],
    benefits: [
      { title: 'More useful forecasts', description: 'Forecasts reflect workload drivers and upcoming commitments rather than a single trend line.' },
      { title: 'Actionable savings', description: 'Recommendations include context, likely effort, validation, and an accountable owner.' },
      { title: 'Shared accountability', description: 'Engineering and finance gain a common language for cost, performance, and reliability decisions.' },
      { title: 'Durable cost control', description: 'A review cadence helps teams catch drift and confirm that implemented changes remain effective.' }
    ],
    approach: [
      { title: 'Frame the review', description: 'Set the time period, subscriptions, business units, cost objectives, and available data sources.' },
      { title: 'Analyze usage', description: 'Trace material spend to services, resource patterns, ownership, commitments, and architecture choices.' },
      { title: 'Validate opportunities', description: 'Review recommendations with service owners to understand performance, availability, and delivery trade-offs.' },
      { title: 'Prioritize action', description: 'Publish an opportunity backlog, measurement approach, governance recommendations, and review cadence.' }
    ],
    useCases: [
      { title: 'Rapid cloud growth', description: 'Establish FinOps practices as subscriptions and workloads expand across teams.' },
      { title: 'Budget pressure', description: 'Identify cost drivers and viable efficiency options before a planning or renewal cycle.' },
      { title: 'Cloud operating model refresh', description: 'Clarify who owns forecasts, budgets, optimization, and cost communication.' }
    ],
    faqs: [
      { question: 'Will the assessment guarantee a fixed savings amount?', answer: 'No. Findings are based on the available usage and pricing data, then validated with owners because savings depend on workload constraints and implementation choices.' },
      { question: 'Do you need access to production systems?', answer: 'The review can usually begin with read-only cost exports and selected monitoring data; access requirements are agreed during scoping.' },
      { question: 'Can the assessment include a FinOps operating cadence?', answer: 'Yes. Recommendations can include roles, monthly reviews, budget alerts, ownership standards, and reporting practices.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'cloud-architecture-second-opinion-review'],
    seo: {
      title: 'Azure FinOps Assessment and Cost Optimization | AtiSunya',
      description: 'Assess Azure spend, resource utilization, forecasts, tagging, and governance to build a prioritized FinOps optimization roadmap.',
      keywords: 'Azure FinOps assessment, Azure cost optimization, Azure spending analysis, cloud financial management, Azure Cost Management'
    }
  },
  {
    slug: 'enterprise-azure-landing-zone-blueprint',
    title: 'Enterprise Azure Landing Zone Blueprint',
    cardDescription: 'Design a governed Azure foundation for identity, networking, security, management, and subscription growth.',
    introduction: 'Create a secure, governed foundation for Azure adoption with an enterprise landing zone blueprint aligned to your organization and cloud operating model.',
    about: 'The blueprint translates cloud strategy and control requirements into a practical Azure platform design. It defines how subscriptions, identity, network connectivity, policy, logging, and operational ownership fit together as new workloads are onboarded.',
    image: '/assets/img/azure-services/azure-landing-zone.svg',
    imageAlt: 'Layered enterprise Azure landing zone architecture showing governance, identity, network, and workload subscriptions',
    challenges: [
      { title: 'Inconsistent foundations', description: 'Independent teams create different subscription, network, and security patterns that are difficult to govern.' },
      { title: 'Controls added too late', description: 'Security, audit, and operational requirements can require rework when they are not part of the initial platform design.' },
      { title: 'Growth bottlenecks', description: 'Central teams become a queue when workload onboarding depends on manual, one-off infrastructure decisions.' },
      { title: 'Unclear cloud ownership', description: 'Platform and workload teams need a clear split of responsibility for shared services and application controls.' }
    ],
    offers: [
      { title: 'Organization and subscription model', description: 'Define management groups, subscription boundaries, naming, tagging, and workload ownership.' },
      { title: 'Identity and governance design', description: 'Document role assignments, policy initiatives, access controls, and compliance guardrails.' },
      { title: 'Network and security foundation', description: 'Set out connectivity, segmentation, DNS, perimeter, logging, and shared security services.' },
      { title: 'Onboarding and operations blueprint', description: 'Provide reference patterns, decision records, and an implementation backlog for platform teams.' }
    ],
    capabilities: ['Azure landing zone design and workload alignment', 'Management group and subscription hierarchy', 'Azure Policy and governance guardrails', 'Identity, network, security, and monitoring patterns', 'Platform team operating model and onboarding process'],
    technologies: ['Azure Landing Zones', 'Azure Policy and Management Groups', 'Microsoft Entra ID', 'Azure Virtual Network and Firewall', 'Azure Monitor and Microsoft Defender for Cloud'],
    benefits: [
      { title: 'Consistent workload onboarding', description: 'Teams have approved patterns for subscriptions, connectivity, policy, and logging.' },
      { title: 'Governance built into the platform', description: 'Control requirements are translated into guardrails that support delivery at scale.' },
      { title: 'Clear platform boundaries', description: 'Shared responsibility between central platform teams and workload owners is documented.' },
      { title: 'A practical delivery backlog', description: 'The blueprint includes decisions and implementation steps teams can sequence and track.' }
    ],
    approach: [
      { title: 'Understand context', description: 'Review cloud strategy, organization structure, compliance obligations, existing subscriptions, and workload plans.' },
      { title: 'Agree design principles', description: 'Set priorities for governance, autonomy, security, connectivity, and service operations.' },
      { title: 'Draft and validate', description: 'Create reference architecture and review it with security, network, identity, platform, and application owners.' },
      { title: 'Sequence implementation', description: 'Deliver a decision log, prioritized work packages, onboarding model, and next-step recommendations.' }
    ],
    useCases: [
      { title: 'First enterprise Azure platform', description: 'Establish a governed baseline before multiple business units launch production services.' },
      { title: 'Subscription sprawl', description: 'Rationalize an existing environment with uneven controls and unclear shared-service boundaries.' },
      { title: 'Regulated workload onboarding', description: 'Define guardrails for applications with heightened identity, audit, network, or data requirements.' }
    ],
    faqs: [
      { question: 'Is the blueprint tied to one landing zone implementation?', answer: 'The design is documented as a reusable target pattern. Implementation can be phased to suit your cloud roadmap and team capacity.' },
      { question: 'Can you work with our existing Azure subscriptions?', answer: 'Yes. The assessment can document what to retain, remediate, consolidate, or establish for new workloads.' },
      { question: 'Does the blueprint cover operating responsibilities?', answer: 'Yes. It addresses platform and workload ownership, onboarding, governance, monitoring, and ongoing change.' }
    ],
    relatedSlugs: ['enterprise-azure-network-architecture-assessment', 'terraform-module-development'],
    seo: {
      title: 'Enterprise Azure Landing Zone Blueprint | AtiSunya',
      description: 'Design an enterprise Azure landing zone for subscriptions, identity, governance, networking, security, monitoring, and repeatable workload onboarding.',
      keywords: 'Azure landing zone blueprint, Azure Landing Zones, enterprise Azure architecture, Azure governance, cloud platform foundation'
    }
  },
  {
    slug: 'terraform-module-development',
    title: 'Terraform Module Development',
    cardDescription: 'Build versioned Terraform modules that make approved Azure infrastructure patterns reusable and reviewable.',
    introduction: 'Give platform and delivery teams a reliable way to provision Azure resources with reusable Terraform modules and clear configuration contracts.',
    about: 'Our Terraform module development service turns infrastructure standards into tested building blocks. Modules are designed around explicit inputs and outputs, sensible defaults, versioning, validation, and documentation so teams can reuse them without obscuring important platform decisions.',
    image: '/assets/img/azure-services/terraform-modules.svg',
    imageAlt: 'Terraform infrastructure code modules assembling reusable Azure platform components',
    challenges: [
      { title: 'Copy-and-paste infrastructure', description: 'Repeated configuration drifts between teams and makes policy changes expensive to apply consistently.' },
      { title: 'Modules with unclear contracts', description: 'Undocumented inputs and hidden assumptions create surprises when a module is reused by another team.' },
      { title: 'Quality checks near release', description: 'Formatting, validation, security, and compatibility issues are discovered late in deployment pipelines.' },
      { title: 'Versioning friction', description: 'Consumers need safe upgrade paths when a shared infrastructure pattern changes.' }
    ],
    offers: [
      { title: 'Module design', description: 'Define boundaries, inputs, outputs, defaults, naming, and compatibility expectations for a chosen Azure pattern.' },
      { title: 'Implementation', description: 'Develop Terraform resources and examples using maintainable conventions and explicit configuration.' },
      { title: 'Automated validation', description: 'Add formatting, validation, plan review, static checks, and module tests to the delivery workflow.' },
      { title: 'Documentation and release', description: 'Publish usage guidance, versioning rules, change notes, and a practical adoption path.' }
    ],
    capabilities: ['Reusable Terraform module architecture', 'Azure resource configuration and composition', 'Input validation, outputs, and examples', 'CI checks and infrastructure test patterns', 'Semantic versioning and upgrade guidance'],
    technologies: ['Terraform and HCL', 'AzureRM provider', 'Azure Verified Modules patterns', 'GitHub Actions or Azure DevOps Pipelines', 'Checkov and TFLint'],
    benefits: [
      { title: 'Repeatable provisioning', description: 'Teams can use a reviewed pattern rather than re-creating infrastructure for each workload.' },
      { title: 'Faster change review', description: 'Clear inputs, examples, and plans make infrastructure changes easier to understand.' },
      { title: 'Better platform consistency', description: 'Shared modules help propagate naming, security, and operational standards.' },
      { title: 'Safer module evolution', description: 'Versioning and release notes give teams a clearer path to adopt improvements.' }
    ],
    approach: [
      { title: 'Select the pattern', description: 'Choose the infrastructure use case, consumers, compliance requirements, and current provisioning workflow.' },
      { title: 'Design the interface', description: 'Agree module scope, variables, outputs, defaults, composition, and compatibility boundaries.' },
      { title: 'Build and validate', description: 'Implement the module, examples, and automated checks against the intended Azure provider versions.' },
      { title: 'Publish and enable', description: 'Document usage, release the first version, and support integration into an existing pipeline.' }
    ],
    useCases: [
      { title: 'Standard workload foundations', description: 'Package common network, monitoring, identity, and resource patterns for application teams.' },
      { title: 'Platform engineering', description: 'Provide self-service infrastructure components behind reviewed pipeline workflows.' },
      { title: 'Infrastructure standardization', description: 'Reduce configuration drift across environments, subscriptions, or delivery teams.' }
    ],
    faqs: [
      { question: 'Can you develop modules for an existing Terraform repository?', answer: 'Yes. We can align to established naming, provider constraints, CI practices, and repository conventions.' },
      { question: 'Do modules include automated tests?', answer: 'The scope can include formatting, validation, static checks, and automated tests appropriate to the module and pipeline.' },
      { question: 'Can modules support multiple environments?', answer: 'Yes. Environment-specific values can be exposed as inputs while keeping the underlying resource pattern consistent.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'enterprise-azure-network-architecture-assessment'],
    seo: {
      title: 'Azure Terraform Module Development | AtiSunya',
      description: 'Develop reusable Azure Terraform modules with tested interfaces, examples, automated validation, versioning, and delivery pipeline guidance.',
      keywords: 'Azure Terraform modules, Terraform module development, Azure infrastructure as code, Terraform Azure, platform engineering'
    }
  },
  {
    slug: 'azure-disaster-recovery-testing',
    title: 'Azure Disaster Recovery Testing',
    cardDescription: 'Validate recovery plans through realistic Azure failover exercises, evidence, and service-owner actions.',
    introduction: 'Build confidence in Azure recovery plans by testing whether people, procedures, dependencies, and technology can meet service recovery objectives.',
    about: 'Disaster recovery testing turns documented recovery assumptions into an observable exercise. We help teams define scenarios, select non-disruptive test methods, coordinate application owners, capture results, and convert gaps into prioritized remediation actions.',
    image: '/assets/img/azure-services/azure-disaster-recovery.svg',
    imageAlt: 'Resilient Azure disaster recovery illustration connecting a primary region with a tested recovery region',
    challenges: [
      { title: 'Plans that have not been exercised', description: 'Runbooks may not reflect current system dependencies, credentials, or operational roles.' },
      { title: 'Unproven recovery objectives', description: 'Teams may have target recovery times and data points without measured evidence from a test.' },
      { title: 'Testing concerns', description: 'Production impact, data consistency, and cross-team timing can make recovery exercises difficult to schedule.' },
      { title: 'Findings without follow-through', description: 'Test observations need clear ownership and retesting criteria to improve real recovery capability.' }
    ],
    offers: [
      { title: 'Recovery readiness review', description: 'Check recovery architecture, backups, replication, dependencies, access, and existing procedures.' },
      { title: 'Exercise design', description: 'Choose test scope, participants, scenario, safety controls, success measures, and evidence requirements.' },
      { title: 'Facilitated testing', description: 'Coordinate test failover or restore activities with cloud, application, security, and business teams.' },
      { title: 'Findings and retest plan', description: 'Record measured results, gaps, owners, priority, and the evidence required for closure.' }
    ],
    capabilities: ['Recovery objective and dependency validation', 'Azure Site Recovery test-failover planning', 'Azure Backup restore verification', 'Application and business service validation', 'Exercise facilitation and remediation tracking'],
    technologies: ['Azure Site Recovery', 'Azure Backup', 'Azure Monitor', 'Azure Storage', 'Azure virtual networks and recovery runbooks'],
    benefits: [
      { title: 'Measured recovery confidence', description: 'Teams see how their recovery process performs against defined service objectives.' },
      { title: 'Safer exercise execution', description: 'A scoped scenario and agreed controls help limit disruption during testing.' },
      { title: 'Stronger runbooks', description: 'Test evidence highlights missing dependencies, access steps, and unclear decisions.' },
      { title: 'Visible remediation', description: 'Owners and retest criteria keep recovery improvements moving after the exercise.' }
    ],
    approach: [
      { title: 'Scope the service', description: 'Confirm critical workloads, recovery objectives, dependencies, test boundaries, and participants.' },
      { title: 'Prepare the exercise', description: 'Review replication and backup readiness, define safety controls, and brief each role.' },
      { title: 'Run and observe', description: 'Execute the agreed failover or restore scenario while recording timing, issues, and validation evidence.' },
      { title: 'Improve and retest', description: 'Prioritize corrective actions and define a focused follow-up exercise for material gaps.' }
    ],
    useCases: [
      { title: 'Annual resilience validation', description: 'Produce current evidence for internal governance, audit, or business continuity reviews.' },
      { title: 'Before a major release', description: 'Confirm recovery procedures for a high-impact application change or platform move.' },
      { title: 'After architecture changes', description: 'Re-test recovery when regions, networks, backups, or application dependencies have changed.' }
    ],
    faqs: [
      { question: 'Will a disaster recovery test interrupt production?', answer: 'The exercise is designed around an agreed scope and safety approach. Test failover and restore methods can validate recovery without an unplanned production switchover.' },
      { question: 'Can tests include application-level validation?', answer: 'Yes. Success criteria can include application health, data checks, integrations, user access, and business owner sign-off.' },
      { question: 'What do we receive after testing?', answer: 'You receive documented scope, results, measured timings, observations, action owners, and recommended retest criteria.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'sap-on-azure-specialized-migration'],
    seo: {
      title: 'Azure Disaster Recovery Testing Services | AtiSunya',
      description: 'Test Azure disaster recovery plans with scoped failover and restore exercises, recovery objective measurement, evidence, and remediation planning.',
      keywords: 'Azure disaster recovery testing, Azure Site Recovery test failover, Azure Backup restore test, cloud DR exercise, recovery planning'
    }
  },
  {
    slug: 'enterprise-azure-network-architecture-assessment',
    title: 'Enterprise Azure Network Architecture Assessment',
    cardDescription: 'Review Azure connectivity, segmentation, DNS, routing, and network operations for enterprise workloads.',
    introduction: 'Understand whether your Azure network can support today’s workloads and future growth with a structured architecture and operations assessment.',
    about: 'We review the network design across Azure, on-premises environments, and connected services. The assessment considers connectivity, address planning, routing, security boundaries, DNS, resilience, and the operational practices that keep enterprise traffic predictable.',
    image: '/assets/img/azure-services/azure-network-assessment.svg',
    imageAlt: 'Azure network architecture diagram showing connected spokes, a central hub, and secure enterprise routes',
    challenges: [
      { title: 'Overlapping address ranges', description: 'Acquisitions, legacy networks, and independently created VNets can constrain peering and hybrid connectivity.' },
      { title: 'Traffic paths are hard to trace', description: 'Multiple gateways, firewalls, routes, and private endpoints make end-to-end flow difficult to explain.' },
      { title: 'Security boundaries vary', description: 'Workload isolation and inspection requirements may be applied differently across subscriptions.' },
      { title: 'Operations depend on tribal knowledge', description: 'Network changes and incident response slow down when ownership and diagnostic practices are unclear.' }
    ],
    offers: [
      { title: 'Architecture and flow review', description: 'Map virtual networks, hubs, spokes, gateways, routes, DNS, and key workload traffic paths.' },
      { title: 'Connectivity and segmentation assessment', description: 'Evaluate hybrid connectivity, address management, trust boundaries, and workload isolation.' },
      { title: 'Resilience and scale review', description: 'Review gateway capacity, regional patterns, failover considerations, and growth constraints.' },
      { title: 'Target-state recommendations', description: 'Prioritize design changes and operational improvements with dependencies and decision points.' }
    ],
    capabilities: ['Hub-and-spoke and Virtual WAN pattern review', 'ExpressRoute, VPN, peering, and routing assessment', 'DNS and private endpoint connectivity review', 'Network security and segmentation design', 'Network monitoring, troubleshooting, and ownership review'],
    technologies: ['Azure Virtual Network', 'Azure Virtual WAN and VPN Gateway', 'Azure Firewall', 'Azure Private Link and Private DNS', 'Network Watcher and ExpressRoute'],
    benefits: [
      { title: 'Clearer traffic visibility', description: 'Architecture maps make important flows, inspection points, and dependencies easier to review.' },
      { title: 'Fewer hidden constraints', description: 'Addressing, routing, and capacity issues are identified before they block workload onboarding.' },
      { title: 'Consistent isolation', description: 'Recommendations align security boundaries with workload and compliance needs.' },
      { title: 'More supportable operations', description: 'Ownership and diagnostic guidance help teams handle changes and incidents with confidence.' }
    ],
    approach: [
      { title: 'Collect the network picture', description: 'Review diagrams, configuration exports, connectivity agreements, incidents, and planned workload needs.' },
      { title: 'Trace critical flows', description: 'Validate representative user, application, data, and administrative paths with network owners.' },
      { title: 'Assess design choices', description: 'Compare current topology against security, performance, resilience, scale, and operational requirements.' },
      { title: 'Deliver findings', description: 'Provide a target-state view, prioritized recommendations, risks, and implementation considerations.' }
    ],
    useCases: [
      { title: 'Network before landing-zone expansion', description: 'Check connectivity and address readiness before onboarding more Azure subscriptions.' },
      { title: 'Hybrid connectivity troubleshooting', description: 'Investigate recurring routing, DNS, latency, or access issues spanning cloud and data centers.' },
      { title: 'Acquisition integration', description: 'Plan network convergence when a new business or cloud estate joins the enterprise.' }
    ],
    faqs: [
      { question: 'Can you assess a hybrid network with more than one Azure region?', answer: 'Yes. The review can include regional topology, on-premises connectivity, route behavior, DNS, and resilience dependencies.' },
      { question: 'Do you need configuration access?', answer: 'The scope can use diagrams and read-only exports where available; any access needs are agreed with network and security owners.' },
      { question: 'Will the assessment include a target-state diagram?', answer: 'Yes. Deliverables can include validated current-state flows and a recommended target-state network view.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'terraform-module-development'],
    seo: {
      title: 'Enterprise Azure Network Architecture Assessment | AtiSunya',
      description: 'Assess Azure network architecture across connectivity, routing, DNS, segmentation, resilience, and operations for enterprise workloads.',
      keywords: 'Azure network architecture assessment, Azure networking, ExpressRoute, hub and spoke Azure, Azure network security'
    }
  },
  {
    slug: 'azure-ai-production-readiness-assessment',
    title: 'Azure AI Production-Readiness Assessment',
    cardDescription: 'Assess security, data, evaluation, operations, and responsible AI controls before an Azure AI launch.',
    introduction: 'Prepare an Azure AI workload for dependable production use with a practical review of architecture, data, security, evaluation, and operations.',
    about: 'This assessment helps teams move beyond a promising prototype. We examine the intended users and risk profile, then review the Azure services, data paths, model behavior, access controls, observability, and release practices needed to support a responsible production rollout.',
    image: '/assets/img/azure-services/azure-ai-readiness.svg',
    imageAlt: 'Azure AI production readiness illustration with a protected AI model connected to data and operations controls',
    challenges: [
      { title: 'Prototype-to-production gaps', description: 'A demo may not include capacity planning, fallbacks, monitoring, or ownership for real user traffic.' },
      { title: 'Sensitive data exposure', description: 'Prompts, retrieval sources, logs, and integrations need consistent access and retention decisions.' },
      { title: 'Unmeasured model quality', description: 'Teams need repeatable evaluation for accuracy, groundedness, latency, safety, and user outcomes.' },
      { title: 'Unclear operating controls', description: 'Model and prompt changes require release, incident, and human oversight practices.' }
    ],
    offers: [
      { title: 'Workload and risk review', description: 'Clarify users, decisions, data sensitivity, acceptable failure modes, and production success criteria.' },
      { title: 'Architecture and security assessment', description: 'Review identity, network boundaries, data access, secrets, logging, and service configuration.' },
      { title: 'Evaluation and quality plan', description: 'Define representative test sets and measures for groundedness, safety, performance, and task completion.' },
      { title: 'Production-readiness roadmap', description: 'Prioritize technical and governance actions for controlled release, monitoring, and continuous evaluation.' }
    ],
    capabilities: ['Azure AI solution architecture review', 'Retrieval and data access path assessment', 'Model evaluation and safety test planning', 'Identity, network, and secret-management review', 'Observability, release, and incident readiness'],
    technologies: ['Azure AI Foundry', 'Azure OpenAI Service', 'Azure AI Search', 'Microsoft Entra ID and Key Vault', 'Azure Monitor and Application Insights'],
    benefits: [
      { title: 'A clearer launch decision', description: 'Teams can see which controls and quality measures are ready and which require work.' },
      { title: 'Better user trust', description: 'Evaluation and feedback practices make model behavior more visible and improvable.' },
      { title: 'Safer data handling', description: 'Access, logging, and retrieval recommendations address sensitive information paths.' },
      { title: 'Operational ownership', description: 'The roadmap identifies who monitors, updates, and responds to production AI behavior.' }
    ],
    approach: [
      { title: 'Define the intended use', description: 'Document users, workflow, data classification, consequence of errors, and launch objectives.' },
      { title: 'Review the solution', description: 'Assess model and retrieval architecture, Azure controls, integrations, and release practices.' },
      { title: 'Test the important risks', description: 'Agree evaluation cases for quality, grounding, safety, latency, failure handling, and human review.' },
      { title: 'Prioritize readiness actions', description: 'Deliver findings and a staged path to pilot, production release, monitoring, and ongoing evaluation.' }
    ],
    useCases: [
      { title: 'Enterprise knowledge assistants', description: 'Review retrieval, permission trimming, answer quality, and source citation behavior.' },
      { title: 'AI-enabled business workflows', description: 'Assess controls when model output informs approvals, case handling, or operational decisions.' },
      { title: 'Production launch gate', description: 'Create a readiness checkpoint before expanding a pilot to more users or business units.' }
    ],
    faqs: [
      { question: 'Does the assessment certify an AI solution as safe?', answer: 'No certification is implied. The assessment documents observed risks, control gaps, and readiness actions for your organization to review.' },
      { question: 'Can you assess an existing prototype?', answer: 'Yes. We can review an existing Azure AI design, demo, or pilot and focus the assessment on its intended production use.' },
      { question: 'Does the review include responsible AI considerations?', answer: 'Yes. Scope can cover intended use, human oversight, evaluation, data handling, user feedback, and escalation practices.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'cloud-architecture-second-opinion-review'],
    seo: {
      title: 'Azure AI Production-Readiness Assessment | AtiSunya',
      description: 'Evaluate Azure AI production readiness across architecture, data protection, model evaluation, responsible AI, observability, and release operations.',
      keywords: 'Azure AI production readiness, Azure OpenAI assessment, Azure AI architecture, AI security assessment, responsible AI'
    }
  },
  {
    slug: 'cloud-architecture-second-opinion-review',
    title: 'Cloud Architecture Second-Opinion Review',
    cardDescription: 'Get an independent review of a cloud design, migration plan, or platform decision before commitment.',
    introduction: 'Bring an independent perspective to a cloud architecture decision while there is still time to validate assumptions and compare options.',
    about: 'A second-opinion review gives technology leaders and delivery teams a focused external assessment of an existing design or plan. We examine the business constraints and decision criteria alongside the technical architecture, then present evidence-based observations without replacing your team’s ownership.',
    image: '/assets/img/azure-services/cloud-architecture-review.svg',
    imageAlt: 'Cloud architecture consulting illustration showing an independent review of interconnected design layers',
    challenges: [
      { title: 'Material decisions under deadline', description: 'Architecture choices can be difficult to revisit once procurement, migration, or delivery is underway.' },
      { title: 'Assumptions not made explicit', description: 'Performance, availability, cost, and security expectations may be embedded in diagrams rather than validated.' },
      { title: 'Limited independent challenge', description: 'Teams need a constructive way to test a proposal while respecting existing knowledge and delivery context.' },
      { title: 'Trade-offs are hard to compare', description: 'Options can appear equivalent until operational effort, resilience, or long-term flexibility is considered.' }
    ],
    offers: [
      { title: 'Decision framing', description: 'Confirm goals, constraints, stakeholders, decision stage, and the questions the review should answer.' },
      { title: 'Architecture review', description: 'Examine solution diagrams, key flows, service choices, security boundaries, and operating assumptions.' },
      { title: 'Options and trade-offs', description: 'Compare credible alternatives against agreed criteria such as cost, resilience, complexity, and time.' },
      { title: 'Executive-ready findings', description: 'Summarize strengths, risks, open questions, and practical next steps in a concise review.' }
    ],
    capabilities: ['Cloud solution and platform architecture review', 'Migration strategy and sequencing review', 'Resilience, security, and operations challenge', 'Assumption and dependency validation', 'Decision records and recommendation workshops'],
    technologies: ['Microsoft Azure architecture patterns', 'AWS and hybrid cloud patterns', 'Cloud Adoption Framework principles', 'Well-Architected review practices', 'Architecture diagrams and decision records'],
    benefits: [
      { title: 'More confident decisions', description: 'Decision-makers can see the assumptions and evidence behind a recommendation.' },
      { title: 'Earlier risk correction', description: 'Open questions are identified before a design becomes expensive to change.' },
      { title: 'Useful independent challenge', description: 'Teams receive a constructive review grounded in their constraints and goals.' },
      { title: 'Clear next steps', description: 'Findings are translated into decisions, validation tasks, or targeted design changes.' }
    ],
    approach: [
      { title: 'Agree the question', description: 'Set the decision boundary, review audience, timing, and materials available for assessment.' },
      { title: 'Inspect the design', description: 'Review architecture, requirements, dependencies, operating model, and decision assumptions.' },
      { title: 'Challenge and compare', description: 'Discuss evidence and credible alternatives with the team in a focused working session.' },
      { title: 'Present the review', description: 'Deliver prioritized observations, recommendations, unresolved questions, and decision-ready options.' }
    ],
    useCases: [
      { title: 'Before a cloud migration commitment', description: 'Review target architecture, sequencing, risks, and readiness assumptions ahead of a major move.' },
      { title: 'Before a platform investment', description: 'Compare design choices before approving a new cloud foundation or shared service.' },
      { title: 'When delivery has stalled', description: 'Uncover hidden dependencies or unresolved architecture decisions affecting implementation progress.' }
    ],
    faqs: [
      { question: 'Is the review an audit or compliance certification?', answer: 'No. It is an advisory review focused on architecture decisions, assumptions, risks, and practical options.' },
      { question: 'Can the review cover an architecture designed by another partner?', answer: 'Yes. The review is independent and constructive, and it can include existing diagrams, plans, and requirements.' },
      { question: 'How much material is needed?', answer: 'A focused review can start with the decision context, architecture diagrams, key requirements, and known constraints.' }
    ],
    relatedSlugs: ['enterprise-azure-landing-zone-blueprint', 'dedicated-azure-finops-assessment'],
    seo: {
      title: 'Cloud Architecture Second-Opinion Review | AtiSunya',
      description: 'Get an independent cloud architecture review of design assumptions, migration plans, risks, options, and operational trade-offs.',
      keywords: 'cloud architecture review, cloud second opinion, Azure architecture assessment, cloud migration review, independent architecture consulting'
    }
  }
];

export function getAzureSpecializedService(slug: string | undefined) {
  return azureSpecializedServices.find((service) => service.slug === slug);
}
