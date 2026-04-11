// ============================================================
// Industries and Services Data - From Backend Database
// ============================================================

import { ServiceModel, IndustryModel } from './cms';

export const backendServices: ServiceModel[] = [
  {
    id: '1',
    slug: 'ai-ml-services',
    title: 'AI & ML Services',
    description: 'Top-notch delivery of comprehensive GenAI and Agentic AI solutions tailored for enterprise success.',
    iconName: 'Brain',
    fullDescription: 'Our AI & ML Services provide cutting-edge artificial intelligence and machine learning solutions designed for modern enterprises. From generative AI implementations to agentic systems, we deliver comprehensive solutions tailored to your business needs with proven expertise across industries.',
    benefits: [
      'Generative AI Implementation',
      'Machine Learning Models',
      'Enterprise AI Integration',
      'Scalable AI Solutions'
    ],
    features: [
      {
        title: 'GenAI Solutions',
        desc: 'Advanced generative AI for content and decision-making',
        iconName: 'Zap'
      },
      {
        title: 'Agentic AI',
        desc: 'Autonomous AI agents for complex workflows',
        iconName: 'Brain'
      },
      {
        title: 'Custom Models',
        desc: 'Tailored machine learning models for your use cases',
        iconName: 'Settings'
      }
    ]
  },
  {
    id: '2',
    slug: 'cloud-cognitive-business-operations',
    title: 'Cloud Cognitive Business Operations',
    description: 'Intelligent cloud-based business operations powered by cognitive technologies.',
    iconName: 'Cloud',
    fullDescription: 'Transform your business operations with our cloud-based cognitive solutions. We deliver intelligent systems that automate processes, enhance decision-making, and optimize resource allocation using advanced cloud infrastructure and AI technologies.',
    benefits: [
      'Cloud Infrastructure',
      'Cognitive Automation',
      'Real-time Analytics',
      'Cost Optimization'
    ],
    features: [
      {
        title: 'Cloud Platform',
        desc: 'Scalable cloud infrastructure for enterprise operations',
        iconName: 'Cloud'
      },
      {
        title: 'Cognitive Automation',
        desc: 'AI-powered process automation and optimization',
        iconName: 'Zap'
      },
      {
        title: 'Analytics & Insights',
        desc: 'Real-time business intelligence and reporting',
        iconName: 'BarChart3'
      }
    ]
  },
  {
    id: '3',
    slug: 'mechanical-industrial-solutions',
    title: 'Mechanical & Industrial Solutions',
    description: 'Expert mechanical engineering and industrial systems design for complex environments.',
    iconName: 'Factory',
    fullDescription: 'Specialized mechanical engineering and industrial systems design services for complex manufacturing and industrial environments. Our team provides comprehensive solutions from concept through implementation with proven expertise in machinery design, automation, and optimization.',
    benefits: [
      'System Design & Engineering',
      'Machinery Optimization',
      'Industrial Automation',
      'Quality Assurance'
    ],
    features: [
      {
        title: 'Design Engineering',
        desc: 'Advanced CAD and mechanical design solutions',
        iconName: 'Wrench'
      },
      {
        title: 'Automation',
        desc: 'Industrial automation and control systems',
        iconName: 'Zap'
      },
      {
        title: 'Optimization',
        desc: 'Equipment performance and efficiency optimization',
        iconName: 'TrendingUp'
      }
    ]
  },
  {
    id: '4',
    slug: 'pipeline-design-installation',
    title: 'Pipeline Design & Installation',
    description: 'Professional pipeline engineering, mapping, and installation services worldwide.',
    iconName: 'GitBranch',
    fullDescription: 'Comprehensive pipeline engineering and installation services covering design, mapping, installation, and maintenance. We provide end-to-end solutions for oil, gas, water, and utility pipelines with global expertise and local knowledge.',
    benefits: [
      'Global Expertise',
      'Advanced Mapping',
      'Quality Installation',
      'Maintenance Support'
    ],
    features: [
      {
        title: 'Engineering Design',
        desc: 'Professional pipeline design and route optimization',
        iconName: 'GitBranch'
      },
      {
        title: 'Installation',
        desc: 'Expert installation and commissioning services',
        iconName: 'Hammer'
      },
      {
        title: 'Maintenance',
        desc: 'Ongoing maintenance and inspection services',
        iconName: 'Wrench'
      }
    ]
  },
  {
    id: '5',
    slug: 'enterprise-solutions',
    title: 'Enterprise Solutions',
    description: 'Scalable enterprise-grade solutions tailored to your business needs.',
    iconName: 'Building2',
    fullDescription: 'Our enterprise solutions provide scalable, robust systems designed for large organizations. From infrastructure to application development, we deliver comprehensive solutions that support your business growth and operational excellence.',
    benefits: [
      'Scalable Infrastructure',
      'Enterprise Architecture',
      'High Availability',
      'Business Continuity'
    ],
    features: [
      {
        title: 'Infrastructure',
        desc: 'Enterprise-grade infrastructure and architecture',
        iconName: 'Building2'
      },
      {
        title: 'Applications',
        desc: 'Custom enterprise applications and integrations',
        iconName: 'Code'
      },
      {
        title: 'Support',
        desc: '24/7 enterprise support and managed services',
        iconName: 'Headphones'
      }
    ]
  },
  {
    id: '6',
    slug: 'cybersecurity-solutions',
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security solutions to protect your digital assets and infrastructure.',
    iconName: 'Shield',
    fullDescription: 'Complete cybersecurity solutions protecting your organization from evolving threats. We provide threat detection, incident response, security consulting, and compliance management to ensure your digital assets and data remain secure.',
    benefits: [
      'Threat Detection',
      'Incident Response',
      'Compliance Management',
      'Security Consulting'
    ],
    features: [
      {
        title: 'Threat Detection',
        desc: 'Advanced threat detection and monitoring systems',
        iconName: 'AlertTriangle'
      },
      {
        title: 'Incident Response',
        desc: 'Rapid response to security incidents',
        iconName: 'Zap'
      },
      {
        title: 'Compliance',
        desc: 'Security compliance and audit management',
        iconName: 'CheckCircle'
      }
    ]
  }
];

export const backendIndustries: IndustryModel[] = [
  {
    id: '1',
    slug: 'manufacturing',
    title: 'Manufacturing',
    description: 'Digital solutions for modern manufacturing',
    iconName: 'Factory',
    fullDescription: 'We deliver cutting-edge solutions tailored for the manufacturing sector, from automation and optimization to digital transformation and Industry 4.0 integration.',
    benefits: [
      'Production Optimization',
      'Equipment Monitoring',
      'Quality Control',
      'Supply Chain Integration'
    ],
    features: [
      {
        title: 'Automation',
        desc: 'Advanced manufacturing automation systems',
        iconName: 'Zap'
      },
      {
        title: 'IoT Integration',
        desc: 'Connected sensors and real-time monitoring',
        iconName: 'Radio'
      },
      {
        title: 'Analytics',
        desc: 'Production analytics and insights',
        iconName: 'BarChart3'
      }
    ]
  },
  {
    id: '2',
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'Health tech solutions for modern healthcare providers',
    iconName: 'Heart',
    fullDescription: 'Our healthcare solutions support patient care, operational efficiency, and digital transformation. From EHR systems to telemedicine platforms, we provide secure and compliant solutions.',
    benefits: [
      'Patient Care Enhancement',
      'Regulatory Compliance',
      'Data Security',
      'Operational Efficiency'
    ],
    features: [
      {
        title: 'EHR Systems',
        desc: 'Electronic health record management systems',
        iconName: 'FileText'
      },
      {
        title: 'Telemedicine',
        desc: 'Remote patient consultation platforms',
        iconName: 'Video'
      },
      {
        title: 'Analytics',
        desc: 'Healthcare data analytics and reporting',
        iconName: 'BarChart3'
      }
    ]
  },
  {
    id: '3',
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    description: 'Omnichannel commerce solutions for retailers',
    iconName: 'ShoppingCart',
    fullDescription: 'Transform your retail business with our comprehensive e-commerce and omnichannel solutions. From online storefronts to inventory management, we enable seamless customer experiences.',
    benefits: [
      'Sales Growth',
      'Customer Experience',
      'Inventory Management',
      'Omnichannel Integration'
    ],
    features: [
      {
        title: 'E-commerce Platform',
        desc: 'Scalable online shopping platforms',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Payment Processing',
        desc: 'Secure payment gateway integration',
        iconName: 'CreditCard'
      },
      {
        title: 'Inventory',
        desc: 'Real-time inventory and order management',
        iconName: 'Package'
      }
    ]
  },
  {
    id: '4',
    slug: 'financial-services',
    title: 'Financial Services',
    description: 'Fintech solutions for financial institutions',
    iconName: 'DollarSign',
    fullDescription: 'We provide secure, compliant fintech solutions for banks, investment firms, and financial institutions. From trading platforms to risk management, we deliver innovation with security.',
    benefits: [
      'Regulatory Compliance',
      'Security & Encryption',
      'Trading Efficiency',
      'Risk Management'
    ],
    features: [
      {
        title: 'Trading Platforms',
        desc: 'Advanced trading and investment platforms',
        iconName: 'TrendingUp'
      },
      {
        title: 'Compliance',
        desc: 'Regulatory compliance management systems',
        iconName: 'CheckCircle'
      },
      {
        title: 'Risk Analysis',
        desc: 'Real-time risk monitoring and analysis',
        iconName: 'AlertTriangle'
      }
    ]
  },
  {
    id: '5',
    slug: 'energy-utilities',
    title: 'Energy & Utilities',
    description: 'Digital solutions for energy and utility sectors',
    iconName: 'Zap',
    fullDescription: 'Optimize energy distribution and utility operations with our smart grid, IoT, and analytics solutions. We enable efficient resource management and sustainability.',
    benefits: [
      'Smart Grid Technology',
      'Energy Efficiency',
      'Real-time Monitoring',
      'Sustainability'
    ],
    features: [
      {
        title: 'Smart Grid',
        desc: 'Intelligent grid management systems',
        iconName: 'Radio'
      },
      {
        title: 'IoT Sensors',
        desc: 'Connected sensor networks for monitoring',
        iconName: 'Zap'
      },
      {
        title: 'Predictive',
        desc: 'Predictive maintenance and analytics',
        iconName: 'TrendingUp'
      }
    ]
  },
  {
    id: '6',
    slug: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    description: 'Supply chain optimization and logistics solutions',
    iconName: 'Truck',
    fullDescription: 'Optimize your entire supply chain with our logistics, tracking, and analytics solutions. From warehouse management to last-mile delivery, we provide visibility and efficiency.',
    benefits: [
      'Route Optimization',
      'Real-time Tracking',
      'Warehouse Automation',
      'Cost Reduction'
    ],
    features: [
      {
        title: 'Tracking',
        desc: 'Real-time shipment tracking and visibility',
        iconName: 'Radio'
      },
      {
        title: 'Optimization',
        desc: 'Route and delivery optimization',
        iconName: 'Navigation'
      },
      {
        title: 'Warehouse',
        desc: 'Warehouse management systems',
        iconName: 'Package'
      }
    ]
  },
  {
    id: '7',
    slug: 'oil-gas',
    title: 'Oil & Gas',
    description: 'Solutions for upstream, midstream, and downstream operations',
    iconName: 'Droplet',
    fullDescription: 'Specialized solutions for the oil and gas industry including exploration, production, distribution, and safety. We provide advanced analytics, automation, and compliance management.',
    benefits: [
      'Production Optimization',
      'Safety & Compliance',
      'Resource Management',
      'Environmental Monitoring'
    ],
    features: [
      {
        title: 'Production',
        desc: 'Reservoir and production optimization',
        iconName: 'TrendingUp'
      },
      {
        title: 'Safety',
        desc: 'Safety systems and incident prevention',
        iconName: 'AlertTriangle'
      },
      {
        title: 'Pipeline',
        desc: 'Pipeline monitoring and management',
        iconName: 'GitBranch'
      }
    ]
  },
  {
    id: '8',
    slug: 'infrastructure-construction',
    title: 'Infrastructure & Construction',
    description: 'Digital solutions for construction and infrastructure projects',
    iconName: 'HardHat',
    fullDescription: 'Streamline construction and infrastructure projects with our project management, BIM, and collaboration solutions. From planning to completion, we enhance efficiency and safety.',
    benefits: [
      'Project Management',
      'Cost Control',
      'Safety Management',
      'Quality Assurance'
    ],
    features: [
      {
        title: 'BIM',
        desc: 'Building Information Modeling systems',
        iconName: 'Building2'
      },
      {
        title: 'Collaboration',
        desc: 'Team collaboration and communication tools',
        iconName: 'Users'
      },
      {
        title: 'Compliance',
        desc: 'Safety and compliance management',
        iconName: 'CheckCircle'
      }
    ]
  }
];
