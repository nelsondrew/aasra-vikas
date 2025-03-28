import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MessageSquare,
  Paperclip,
  User,
  ChevronDown,
  Send,
  Clock,
  IndianRupee,
  Building2,
  FileCheck,
  BadgeIndianRupee,
  X,
  ClipboardCheck,
  Search,
  FileWarning,
  CheckCircle2,
  XCircle,
  Banknote,
} from 'lucide-react';

// Types
type Comment = {
  id: number;
  author: string;
  isBank: boolean;
  content: string;
  timestamp: string;
};

type Attachment = {
  id: number;
  name: string;
  size: string;
  type: string;
};

type TimelineEvent = {
  id: number;
  type: 'status_change' | 'comment' | 'document_added';
  content: string;
  timestamp: string;
  oldStatus?: string;
  newStatus?: string;
};

type LoanStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'CHANGES_REQUIRED' | 'APPROVED' | 'REJECTED' | 'DISBURSED';
type LoanType = 'PERSONAL' | 'HOME' | 'BUSINESS' | 'VEHICLE';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(9, 30, 66, 0.25);
  width: 100%;
  max-width: 32rem;
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #DFE1E6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #172B4D;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B778C;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #EBECF0;
    color: #172B4D;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const StatusOptionList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const StatusOption = styled.button<{ variant: string; isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.375rem;
  border: 2px solid ${props => props.isSelected ? '#4C9AFF' : '#DFE1E6'};
  background-color: ${props => props.isSelected ? '#DEEBFF' : 'white'};
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.isSelected ? '#DEEBFF' : '#FAFBFC'};
    border-color: ${props => props.isSelected ? '#4C9AFF' : '#4C9AFF'};
  }
`;

const StatusInfo = styled.div`
  flex-grow: 1;
`;

const StatusName = styled.div`
  font-weight: 500;
  color: #172B4D;
  margin-bottom: 0.25rem;
`;

const StatusDescription = styled.div`
  font-size: 0.875rem;
  color: #6B778C;
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #DFE1E6;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background-color: #0052CC;
    color: white;
    border: none;

    &:hover {
      background-color: #0747A6;
    }

    &:active {
      background-color: #0747A6;
    }
  ` : `
    background-color: white;
    color: #42526E;
    border: 1px solid #DFE1E6;

    &:hover {
      background-color: #FAFBFC;
      border-color: #DFE1E6;
    }

    &:active {
      background-color: #EBECF0;
    }
  `}
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #F4F5F7;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(9, 30, 66, 0.13);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TicketId = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7A869A;
  font-size: 0.875rem;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span<{ variant: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${props => {
    switch (props.variant) {
      case 'SUBMITTED':
        return 'background-color: #DEEBFF; color: #0747A6;';
      case 'UNDER_REVIEW':
        return 'background-color: #FFF7E6; color: #974F0C;';
      case 'CHANGES_REQUIRED':
        return 'background-color: #FFF0E6; color: #974F0C;';
      case 'APPROVED':
        return 'background-color: #E6FFE6; color: #006644;';
      case 'REJECTED':
        return 'background-color: #FFE6E6; color: #BF2600;';
      case 'DISBURSED':
        return 'background-color: #F3E6FF; color: #403294;';
      case 'PERSONAL':
        return 'background-color: #DEEBFF; color: #0747A6;';
      case 'HOME':
        return 'background-color: #E6FFE6; color: #006644;';
      case 'BUSINESS':
        return 'background-color: #F3E6FF; color: #403294;';
      case 'VEHICLE':
        return 'background-color: #FFF0E6; color: #974F0C;';
      default:
        return 'background-color: #EBECF0; color: #172B4D;';
    }
  }}
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #172B4D;
  margin: 0 0 1rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7A869A;
  font-size: 0.875rem;
  padding: 0.5rem;
  background: #FAFBFC;
  border-radius: 0.375rem;
`;

const DocumentsSection = styled.div`
  border-top: 1px solid #DFE1E6;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0747A6;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #FAFBFC;
  border-radius: 0.375rem;
  border: 1px solid #DFE1E6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #DEEBFF;
    border-color: #4C9AFF;
  }
`;

const DocumentInfo = styled.div`
  flex-grow: 1;
`;

const DocumentName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin: 0;
`;

const DocumentMeta = styled.p`
  font-size: 0.75rem;
  color: #7A869A;
  margin: 0.25rem 0 0 0;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.625rem;
    top: 0.625rem;
    bottom: 0.625rem;
    width: 2px;
    background-color: #DFE1E6;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;

    &::before {
      display: none;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -2rem;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  background-color: #4C9AFF;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  z-index: 1;
`;

const TimelineContent = styled.div`
  background-color: #FAFBFC;
  border: 1px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.75rem;
`;

const TimelineText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin: 0;
`;

const TimelineTime = styled.p`
  font-size: 0.75rem;
  color: #7A869A;
  margin: 0.25rem 0 0 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #FAFBFC;
  border-radius: 0.375rem;
  border: 1px solid #DFE1E6;
`;

const Avatar = styled.div<{ isBank: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isBank ? '#DEEBFF' : '#EBECF0'};
  border: 2px solid ${props => props.isBank ? '#4C9AFF' : '#DFE1E6'};
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex-grow: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #0747A6;
`;

const CommentRole = styled.span<{ isBank: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.isBank ? '#DEEBFF' : '#EBECF0'};
  color: #0747A6;
`;

const CommentTime = styled.span`
  font-size: 0.75rem;
  color: #7A869A;
`;

const CommentText = styled.p`
  color: #172B4D;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const CommentForm = styled.form`
  position: relative;
  margin-top: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.75rem 3rem 0.75rem 1rem;
  resize: vertical;
  min-height: 6rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #172B4D;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4C9AFF;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }

  &::placeholder {
    color: #7A869A;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  padding: 0.5rem;
  color: #0052CC;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: #DEEBFF;
    color: #0747A6;
  }

  &:active {
    background-color: #B3D4FF;
  }
`;

const Sidebar = styled.div`
  width: 20rem;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  background-color: white;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  appearance: none;
  color: #172B4D;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4C9AFF;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }

  &:hover {
    background-color: #FAFBFC;
  }
`;

const SelectWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #7A869A;
  }
`;

const StatusButton = styled.button`
  width: 100%;
  background-color: white;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  color: #172B4D;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #FAFBFC;
    border-color: #4C9AFF;
  }
`;

function ApplicationDetails() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Rahul DSA",
      isBank: false,
      content: "I've submitted the loan application for Mr. Patel. All required documents including income proof, bank statements, and KYC are attached. The client has a good credit score of 750.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Priya Sharma",
      isBank: true,
      content: "Thank you for the submission. I notice the bank statements are only for 3 months. As per our policy, we need statements for the last 6 months. Please provide the additional statements.",
      timestamp: "1 hour ago"
    }
  ]);

  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: 1,
      type: 'status_change',
      content: 'Loan application submitted',
      timestamp: '2 hours ago',
      oldStatus: '',
      newStatus: 'SUBMITTED'
    },
    {
      id: 2,
      type: 'document_added',
      content: 'Documents uploaded: Income Proof, Bank Statements, KYC',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'status_change',
      content: 'Application under review',
      timestamp: '1.5 hours ago',
      oldStatus: 'SUBMITTED',
      newStatus: 'UNDER_REVIEW'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [assignee, setAssignee] = useState('Priya Sharma');
  const [status, setStatus] = useState<LoanStatus>('UNDER_REVIEW');
  const [loanType, setLoanType] = useState<LoanType>('PERSONAL');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<LoanStatus | null>(null);

  const attachments: Attachment[] = [
    { id: 1, name: 'income-proof-2024.pdf', size: '2.1 MB', type: 'Document' },
    { id: 2, name: 'bank-statements.pdf', size: '3.4 MB', type: 'Document' },
    { id: 3, name: 'kyc-documents.pdf', size: '1.8 MB', type: 'Document' },
    { id: 4, name: 'credit-report.pdf', size: '956 KB', type: 'Document' }
  ];

  const statuses: { 
    status: LoanStatus; 
    description: string;
    icon: React.ReactNode;
  }[] = [
    { 
      status: 'SUBMITTED', 
      description: 'Application has been submitted and is pending review',
      icon: <ClipboardCheck size={20} />
    },
    { 
      status: 'UNDER_REVIEW', 
      description: 'Application is being reviewed by the bank team',
      icon: <Search size={20} />
    },
    { 
      status: 'CHANGES_REQUIRED', 
      description: 'Additional documents or information needed',
      icon: <FileWarning size={20} />
    },
    { 
      status: 'APPROVED', 
      description: 'Loan application has been approved',
      icon: <CheckCircle2 size={20} />
    },
    { 
      status: 'REJECTED', 
      description: 'Loan application has been rejected',
      icon: <XCircle size={20} />
    },
    { 
      status: 'DISBURSED', 
      description: 'Loan amount has been disbursed to the account',
      icon: <Banknote size={20} />
    }
  ];

  const loanTypes: LoanType[] = ['PERSONAL', 'HOME', 'BUSINESS', 'VEHICLE'];
  const bankTeam = ['Priya Sharma', 'Amit Kumar', 'Sneha Patel', 'Rajesh Verma'];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Rahul DSA",
      isBank: false,
      content: newComment,
      timestamp: 'Just now'
    };

    setComments([...comments, comment]);
    setNewComment('');

    const timelineEvent: TimelineEvent = {
      id: timeline.length + 1,
      type: 'comment',
      content: `Comment added by ${comment.author}`,
      timestamp: 'Just now'
    };

    setTimeline([...timeline, timelineEvent]);
  };

  const handleStatusChange = (newStatus: LoanStatus) => {
    const timelineEvent: TimelineEvent = {
      id: timeline.length + 1,
      type: 'status_change',
      content: `Status changed from ${status} to ${newStatus}`,
      timestamp: 'Just now',
      oldStatus: status,
      newStatus: newStatus
    };

    setStatus(newStatus);
    setTimeline([...timeline, timelineEvent]);
    setIsStatusModalOpen(false);
    setSelectedStatus(null);
  };

  const openStatusModal = () => {
    setSelectedStatus(status);
    setIsStatusModalOpen(true);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <FlexContainer>
          <MainContent>
            <Card>
              <Header>
                <TicketId>
                  <BadgeIndianRupee size={16} />
                  <span>LOAN-2024-456</span>
                </TicketId>
                <StatusContainer>
                  <Badge variant={status}>{status.replace('_', ' ')}</Badge>
                  <Badge variant={loanType}>{loanType}</Badge>
                </StatusContainer>
              </Header>
              <Title>Personal Loan Application - Raj Patel</Title>
              <InfoGrid>
                <InfoItem>
                  <IndianRupee size={16} />
                  <span>Loan Amount: ₹5,00,000</span>
                </InfoItem>
                <InfoItem>
                  <Clock size={16} />
                  <span>Tenure: 36 months</span>
                </InfoItem>
                <InfoItem>
                  <FileCheck size={16} />
                  <span>CIBIL Score: 750</span>
                </InfoItem>
              </InfoGrid>

              <DocumentsSection>
                <SectionTitle>
                  <Paperclip size={20} />
                  Required Documents ({attachments.length})
                </SectionTitle>
                <DocumentGrid>
                  {attachments.map(attachment => (
                    <DocumentItem key={attachment.id}>
                      <Paperclip size={16} />
                      <DocumentInfo>
                        <DocumentName>{attachment.name}</DocumentName>
                        <DocumentMeta>{attachment.size} • {attachment.type}</DocumentMeta>
                      </DocumentInfo>
                    </DocumentItem>
                  ))}
                </DocumentGrid>
              </DocumentsSection>
            </Card>

            <Card>
              <SectionTitle>
                <Clock size={20} />
                Application Timeline
              </SectionTitle>
              <Timeline>
                {timeline.map((event, index) => (
                  <TimelineItem key={event.id}>
                    <TimelineDot />
                    <TimelineContent>
                      <TimelineText>{event.content}</TimelineText>
                      <TimelineTime>{event.timestamp}</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Card>

            <Card>
              <SectionTitle>
                <MessageSquare size={20} />
                Discussion ({comments.length})
              </SectionTitle>

              <CommentList>
                {comments.map(comment => (
                  <CommentItem key={comment.id}>
                    <Avatar isBank={comment.isBank}>
                      {comment.isBank ? (
                        <Building2 size={20} />
                      ) : (
                        <User size={20} />
                      )}
                    </Avatar>
                    <CommentContent>
                      <CommentHeader>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentRole isBank={comment.isBank}>
                          {comment.isBank ? 'Bank Officer' : 'DSA Agent'}
                        </CommentRole>
                        <CommentTime>{comment.timestamp}</CommentTime>
                      </CommentHeader>
                      <CommentText>{comment.content}</CommentText>
                    </CommentContent>
                  </CommentItem>
                ))}
              </CommentList>

              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentInput
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your response..."
                />
                <SendButton type="submit">
                  <Send size={20} />
                </SendButton>
              </CommentForm>
            </Card>
          </MainContent>

          <Sidebar>
            <Card>
              <FormGroup>
                <Label>Application Status</Label>
                <StatusButton onClick={openStatusModal}>
                  <span>{status.replace('_', ' ')}</span>
                  <ChevronDown size={20} />
                </StatusButton>
              </FormGroup>

              <FormGroup>
                <Label>Loan Type</Label>
                <SelectWrapper>
                  <Select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value as LoanType)}
                  >
                    {loanTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                  <ChevronDown size={20} />
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Reviewing Officer</Label>
                <SelectWrapper>
                  <Select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    {bankTeam.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </Select>
                  <ChevronDown size={20} />
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Submitted On</Label>
                <InfoItem>
                  <Clock size={16} />
                  <span>March 15, 2024 10:30 AM</span>
                </InfoItem>
              </FormGroup>

              <FormGroup>
                <Label>Last Updated</Label>
                <InfoItem>
                  <Clock size={16} />
                  <span>1 hour ago</span>
                </InfoItem>
              </FormGroup>

              <FormGroup>
                <Label>Branch</Label>
                <InfoItem>
                  <Building2 size={16} />
                  <span>Andheri East, Mumbai</span>
                </InfoItem>
              </FormGroup>
            </Card>
          </Sidebar>
        </FlexContainer>
      </ContentWrapper>

      {isStatusModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Change Application Status</ModalTitle>
              <CloseButton onClick={() => setIsStatusModalOpen(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <StatusOptionList>
                {statuses.map(({ status: statusOption, description, icon }) => (
                  <StatusOption
                    key={statusOption}
                    variant={statusOption}
                    isSelected={selectedStatus === statusOption}
                    onClick={() => setSelectedStatus(statusOption)}
                  >
                    {icon}
                    <StatusInfo>
                      <StatusName>{statusOption.replace('_', ' ')}</StatusName>
                      <StatusDescription>{description}</StatusDescription>
                    </StatusInfo>
                  </StatusOption>
                ))}
              </StatusOptionList>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsStatusModalOpen(false)}>Cancel</Button>
              <Button
                variant="primary"
                onClick={() => selectedStatus && handleStatusChange(selectedStatus)}
                disabled={!selectedStatus}
              >
                Update Status
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default ApplicationDetails;